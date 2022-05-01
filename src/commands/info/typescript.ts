import { CommandInteraction } from 'discord.js'

export async function execute(interaction: CommandInteraction): Promise<void> {
    await interaction.reply('Hello! This is D-bot 2.0 running on typescript')
}
