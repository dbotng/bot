import { SlashCommandSubcommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export const data = new SlashCommandSubcommandBuilder()
    .setName('login')
    .setDescription('Newgrounds logout')

export async function execute(interaction: CommandInteraction) {
    //TODO
}