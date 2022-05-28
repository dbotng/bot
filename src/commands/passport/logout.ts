import { SlashCommandSubcommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export const data = new SlashCommandSubcommandBuilder()
    .setName('logout')
    .setDescription('Newgrounds login')

export async function execute(interaction: CommandInteraction) {
    //TODO
}
