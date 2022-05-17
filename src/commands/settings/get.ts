import { SlashCommandSubcommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import embedBuilder from '../../builders/embedBuilder'
import prisma from '../../clients/prisma'
import SettingsQuery from '../../interfaces/SettingsQuery'

export const data = new SlashCommandSubcommandBuilder()
    .setName('get')
    .setDescription('Get all settings')

export async function execute(interaction: CommandInteraction): Promise<void> {
    const query: unknown = await prisma.servers.findUnique({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        where: { id: interaction.guildId! },
    })
    await interaction.reply({
        embeds: [
            new embedBuilder().create('Here are your settings', '').addFields({
                name: 'Cooldown',
                value: `Time: ${
                    (query as SettingsQuery)?.settings.cooldown.time
                }\n Enabled commands: ${
                    (query as SettingsQuery)?.settings.cooldown.commands
                }`,
            }),
        ],
    })
}
