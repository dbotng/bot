import { SlashCommandSubcommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export const data = new SlashCommandSubcommandBuilder()
    .setName('typescript')
    .setDescription('Welcome to typescript!')

export async function execute(interaction: CommandInteraction): Promise<void> {
    await interaction.reply('Hello! This is D-bot 2.0 running on typescript')
}
