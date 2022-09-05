import {
    SlashCommandStringOption,
    SlashCommandSubcommandBuilder,
} from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import commandSuccessEmbedBuilder from '../../builders/embeds/commandSuccessEmbedBuilder'
import userErrorEmbedBuilder from '../../builders/embeds/userErrorEmbedBuilder'
import prisma from '../../clients/prisma'
import { NewgroundsUserQuery } from '../../types/prismaQueries'

export const data = new SlashCommandSubcommandBuilder()
    .setName('disconnect')
    .setDescription('Disconnect an NG account')
    .addStringOption(arg1)

function arg1(option: SlashCommandStringOption) {
    return option
        .setName('username')
        .setDescription('Newgrounds username')
        .setRequired(true)
}

export async function execute(interaction: CommandInteraction) {
    const query = await prisma.discordUser.findUnique({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        where: { id: BigInt(interaction.user.id!) },
        select: { newgroundsUser: true },
    })

    if (query == null) {
        await interaction.reply({
            embeds: [
                new userErrorEmbedBuilder().create(
                    'No any connecting Newgrounds accounts found.'
                ),
            ],
        })
    } else if (interaction.options.getString('username') == '*') {
        await prisma.discordUser.update({
            where: {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                id: BigInt(interaction.user.id!),
            },
            data: {
                newgroundsUser: {
                    deleteMany: {},
                },
            },
        })
        await interaction.reply({
            embeds: [
                new commandSuccessEmbedBuilder().create(
                    'All Newgrounds accounts are now disconnected from your Discord account.'
                ),
            ],
        })
    } else {
        const isRemovedOrNotExist = (
            query?.newgroundsUser as NewgroundsUserQuery[]
        ).some(async (account) => {
            if (account.name == interaction.options.getString('username')) {
                await prisma.discordUser.update({
                    where: {
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        id: BigInt(interaction.user.id!),
                    },
                    data: {
                        newgroundsUser: {
                            deleteMany: [
                                {
                                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                    name: interaction.options.getString(
                                        'username'
                                    )!,
                                },
                            ],
                        },
                    },
                })
                await interaction.reply({
                    embeds: [
                        new commandSuccessEmbedBuilder().create(
                            'The Newgrounds account is now disconnected from your Discord account.'
                        ),
                    ],
                })
                return true
            } else {
                return false
            }
        })
        if (!isRemovedOrNotExist) {
            await interaction.reply({
                embeds: [
                    new userErrorEmbedBuilder().create(
                        'No Newgrounds account found.'
                    ),
                ],
            })
        }
    }
}
