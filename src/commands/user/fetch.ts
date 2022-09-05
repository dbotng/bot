import {
    ChatInputCommandInteraction,
    SlashCommandStringOption,
    SlashCommandSubcommandBuilder,
    SlashCommandUserOption,
} from 'discord.js'
import embedBuilder from '@d-bot/builders/embeds/embedBuilder.js'
import userErrorEmbedBuilder from '@d-bot/builders/embeds/userErrorEmbedBuilder.js'
import prisma from '@d-bot/clients/prisma.js'
import {
    DiscordUserQuery,
    NewgroundsUserQuery,
} from '@d-bot/types/prismaQueries.js'

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
        .setName('user')
        .setDescription('Discord User')
        .setRequired(false)
}

export async function execute(interaction: ChatInputCommandInteraction) {
    if (
        interaction.options.getString('username') == null &&
        interaction.options.getUser('user') == null
    ) {
        await interaction.reply({
            embeds: [
                new userErrorEmbedBuilder().create('Arguments not given.'),
            ],
        })
    } else if (
        interaction.options.getString('username') != null &&
        interaction.options.getUser('user') != null
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
        console.log(query)
        if (query) {
            await interaction.reply({
                embeds: [
                    new embedBuilder()
                        .create(
                            "Newgrounds user's info",
                            `Username: ${
                                (query as unknown as NewgroundsUserQuery).name
                            }\nSupporter: ${
                                (query as unknown as NewgroundsUserQuery)
                                    .supporter
                            }\nDiscord Tag: ${
                                (
                                    query
                                        .discordUser[0] as unknown as DiscordUserQuery
                                ).username
                            }#${
                                (
                                    query
                                        .discordUser[0] as unknown as DiscordUserQuery
                                ).discriminator
                            }`
                        )
                        .setThumbnail(
                            (query as unknown as NewgroundsUserQuery).icons
                                .large
                        ),
                ],
            })
        }
    } else {
        const query = await prisma.discordUser.findUnique({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            where: { id: BigInt(interaction.options.getUser('user')!.id) },
            select: { newgroundsUser: true },
        })
        console.log(query)
        if (query) {
            await interaction.reply({
                embeds: [
                    new embedBuilder().create(
                        'info',
                        `${
                            (
                                query
                                    .newgroundsUser[0] as unknown as NewgroundsUserQuery
                            ).name
                        }`
                    ),
                ],
            })
        }
    }
}
