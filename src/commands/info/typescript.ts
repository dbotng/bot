import { CommandInteraction } from 'discord.js'

export default async function (interaction: CommandInteraction): Promise<void> {
    await interaction.reply('Hello! This is D-bot 2.0 running on typescript')
}
