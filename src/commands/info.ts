import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

import * as typescript from './info/typescript'

export const data = new SlashCommandBuilder()
    .setName('info')
    .setDescription('Information commands')
    .addSubcommand((command) =>
        command.setName('typescript').setDescription('Welcome to typescript!')
    )

export async function execute(interaction: CommandInteraction) {
    switch (interaction.options.getSubcommand()) {
        case 'typescript': {
            await typescript.execute(interaction)
            break
        }
    }
}
