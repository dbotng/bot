import {
    SlashCommandStringOption,
    SlashCommandSubcommandBuilder,
} from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export const data = new SlashCommandSubcommandBuilder()
    .setName('echo')
    .setDescription('Echos the content')
    .addStringOption(arg1)

function arg1(option: SlashCommandStringOption) {
    return option
        .setName('content')
        .setDescription('Content to echo')
        .setRequired(true)
}

export async function execute(interaction: CommandInteraction): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await interaction.reply(interaction.options.getString('content')!)
}
