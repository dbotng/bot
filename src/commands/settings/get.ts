import { ChatInputCommandInteraction, SlashCommandSubcommandBuilder } from 'discord.js'
import embedBuilder from '@d-bot/builders/embeds/embedBuilder.js'
import prisma from '@d-bot/clients/prisma.js'
import * as queries from '@d-bot/types/prismaQueries.js'

export const data = new SlashCommandSubcommandBuilder()
    .setName('get')
    .setDescription('Get all settings')

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const query = await prisma.servers.findUnique({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        where: { id: BigInt(interaction.guildId!) },
        select: { settings: true },
    })
    await interaction.reply({
        embeds: [
            new embedBuilder().create('Here are your settings', '').addFields({
                name: 'Cooldown',
                value: `Time: ${
                    (query?.settings as queries.SettingsQuery).cooldown.time
                }\nEnabled commands: ${
                    (query?.settings as queries.SettingsQuery).cooldown.commands
                }`,
            }),
        ],
    })
}
