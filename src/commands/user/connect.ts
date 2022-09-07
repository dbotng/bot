import {
    ChatInputCommandInteraction,
    Message,
    ActionRowBuilder,
    ButtonBuilder,
    MessageComponentInteraction,
    SlashCommandSubcommandBuilder,
    ComponentType,
    ButtonStyle,
} from 'discord.js'
import embedBuilder from '@d-bot/builders/embeds/embedBuilder.js'
import 'dotenv/config'
import phin from 'phin'
import { response as NGResponse } from '@d-bot/types/newgrounds/responses.js'
import userErrorEmbedBuilder from '@d-bot/builders/embeds/userErrorEmbedBuilder.js'
import commandSuccessEmbedBuilder from '@d-bot/builders/embeds/commandSuccessEmbedBuilder.js'
import prisma from '@d-bot/clients/prisma.js'
import { Prisma } from '@prisma/client'

export const data = new SlashCommandSubcommandBuilder()
    .setName('connect')
    .setDescription('Connect an NG account')

export async function execute(interaction: ChatInputCommandInteraction) {
    const sessionStartResult = await ngPostData({
        component: 'App.startSession',
        params: { force: true },
    })

    const sessionId = (sessionStartResult as NGResponse).result.data.session.id

    const filter = (button: MessageComponentInteraction) => {
        button.deferUpdate()
        return button.user.id === interaction.user.id
    }

    interaction
        .reply({
            embeds: [
                new embedBuilder()
                    .create(
                        'Passport Login',
                        'To connect your Newgrounds account to your Discord account please click on the button below, once you finish logging in please click on the "Done" button. You only have 1 minute to do so.'
                    )
                    .addFields(
                        {
                            name: '⚠️ FIRST TIME USERS PLEASE CAUTION ⚠️',
                            value: "Your first connected account will be set as primary account. If you don't do this please remove all accounts with /user disconnect * and add them again.",
                        },
                        {
                            name: "But I don't feel like giving sensitive info to the bot!",
                            value: 'The bot uses the standard newgrounds.io API, and as a security measure after your accounts are connected the bot will only save necessary info and automatically logout of the session, the source code is also public too if you want to care about whats happening behind the scenes.',
                        },
                        {
                            name: 'Source code',
                            value: '[Link](https://github.com/dbotng/bot)',
                        }
                    ),
            ],
            components: [
                new ActionRowBuilder<ButtonBuilder>().addComponents(
                    new ButtonBuilder()
                        .setURL(
                            (sessionStartResult as NGResponse).result.data
                                .session.passport_url
                        )
                        .setLabel('Login to Newgrounds')
                        .setStyle(ButtonStyle.Link),
                    new ButtonBuilder()
                        .setCustomId('done')
                        .setLabel('Done')
                        .setStyle(ButtonStyle.Success)
                ),
            ],
            fetchReply: true,
        })
        .then(async (reply) => {
            ;(reply as Message)
                .awaitMessageComponent({
                    filter,
                    componentType: ComponentType.Button,
                    time: 60000,
                })
                .then(async (button) => {
                    switch (button.customId) {
                        case 'done': {
                            const sessionCheckResult = await ngPostData({
                                component: 'App.checkSession',
                                session_id: sessionId,
                            })
                            if (
                                !(sessionCheckResult as NGResponse).result.data
                                    .session.user
                            ) {
                                await interaction.editReply({
                                    embeds: [
                                        new userErrorEmbedBuilder().create(
                                            'No user found. Please try again.'
                                        ),
                                    ],
                                    components: [],
                                })
                            } else {
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                const user = (sessionCheckResult as NGResponse)
                                    .result.data.session.user!
                                await prisma.newgroundsUser.create({
                                    data: {
                                        id: user.id,
                                        name: user.name,
                                        supporter: user.supporter,
                                        icons: user.icons as unknown as Prisma.InputJsonValue,
                                        discordUser: {
                                            connectOrCreate: {
                                                where: {
                                                    id: BigInt(
                                                        interaction.user.id
                                                    ),
                                                },
                                                create: {
                                                    id: BigInt(
                                                        interaction.user.id
                                                    ),
                                                    username:
                                                        interaction.user
                                                            .username,
                                                    discriminator:
                                                        interaction.user
                                                            .discriminator,
                                                },
                                            },
                                        },
                                    },
                                })
                                await interaction.editReply({
                                    embeds: [
                                        new commandSuccessEmbedBuilder().create(
                                            'Your Newgrounds account is now connected to your Discord account.'
                                        ),
                                    ],
                                    components: [],
                                })
                            }
                        }
                    }
                })
                .catch(async () => {
                    await interaction.editReply({
                        embeds: [
                            new userErrorEmbedBuilder().create(
                                'Command timeout. Try again.'
                            ),
                        ],
                        components: [],
                    })
                })
                .finally(
                    async () =>
                        await ngPostData({
                            component: 'App.endSession',
                            session_id: sessionId,
                        })
                )
        })
}

async function ngPostData(options: {
    component: string
    session_id?: string
    params?: paramOptions
}) {
    const data = {
        app_id: process.env.ngAppId,
        session_id: options.session_id,
        debug: process.env.environment == 'dev' ? true : false,
        call: {
            component: options.component,
            parameters: options.params,
        },
    }
    return (
        await phin({
            url: 'https://www.newgrounds.io/gateway_v3.php',
            method: 'POST',
            parse: 'json',
            form: {
                input: JSON.stringify(data),
            },
        })
    ).body
}

type paramOptions = {
    force?: boolean
}
