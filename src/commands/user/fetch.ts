import {
    ChatInputCommandInteraction,
    SlashCommandStringOption,
    SlashCommandSubcommandBuilder,
    SlashCommandUserOption,
} from 'discord.js'
import embedBuilder from '@tankbot/builders/embeds/embedBuilder.js'
import userErrorEmbedBuilder from '@tankbot/builders/embeds/userErrorEmbedBuilder.js'
import prisma from '@tankbot/clients/prisma.js'
import { discordUser, newgroundsUser, Prisma } from '@prisma/client'

export const data = new SlashCommandSubcommandBuilder()
    .setName('fetch')
    .setDescription("Fetch a Newgrounds account's detail")
    .addStringOption(arg1)
    .addUserOption(arg2)

function arg1(option: SlashCommandStringOption) {
    return option
        .setName('username')
        .setDescription('Newgrounds username')
        .setRequired(false)
}

function arg2(option: SlashCommandUserOption) {
    return option
        .setName('discord')
        .setDescription('Discord Tag')
        .setRequired(false)
}

export async function execute(interaction: ChatInputCommandInteraction) {
    if (
        interaction.options.getString('username') == null &&
        interaction.options.getUser('discord') == null
    ) {
        await interaction.reply({
            embeds: [
                new userErrorEmbedBuilder().create('Arguments not given.'),
            ],
        })
    } else if (
        interaction.options.getString('username') != null &&
        interaction.options.getUser('discord') != null
    ) {
        await interaction.reply({
            embeds: [
                new userErrorEmbedBuilder().create(
                    'Command only support one arguments but got two.'
                ),
            ],
        })
    } else if (interaction.options.getString('username') != null) {
        const query = await prisma.newgroundsUser.findUnique({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            where: { name: interaction.options.getString('username')! },
            include: { discordUser: true },
        })
        if (query) {
            await interaction.reply({
                embeds: [
                    new embedBuilder()
                        .create(
                            "Newgrounds user's info",
                            `Username: ${
                                (query as newgroundsUser).name
                            }\nSupporter: ${
                                (query as newgroundsUser).supporter
                            }\nDiscord Tag: ${
                                (query.discordUser[0] as discordUser).username
                            }#${
                                (query.discordUser[0] as discordUser)
                                    .discriminator
                            }`
                        )
                        .setThumbnail(
                            (
                                (query as newgroundsUser)
                                    .icons as Prisma.JsonObject
                            )?.large as string
                        ),
                ],
            })
        }
    } else {
        const query = await prisma.discordUser.findUnique({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            where: { id: BigInt(interaction.options.getUser('discord')!.id) },
            select: { newgroundsUser: true },
        })
        if (query) {
            await interaction.reply({
                embeds: [
                    new embedBuilder().create(
                        'info',
                        `${(query.newgroundsUser[0] as newgroundsUser).name}`
                    ),
                ],
            })
        }
    }
}
