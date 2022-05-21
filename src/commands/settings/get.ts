import { SlashCommandSubcommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import embedBuilder from '../../builders/embedBuilder'
import prisma from '../../clients/prisma'
import * as queries from '../../types/queries'

export const data = new SlashCommandSubcommandBuilder()
    .setName('get')
    .setDescription('Get all settings')

export async function execute(interaction: CommandInteraction): Promise<void> {
    const query = await prisma.servers.findUnique({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        where: { id: interaction.guildId! },
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
