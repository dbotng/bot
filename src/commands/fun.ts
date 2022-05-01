import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

import * as echo from './fun/echo'

export const data = new SlashCommandBuilder()
    .setName('fun')
    .setDescription('Fun commands')
    .addSubcommand((command) =>
        command
            .setName('echo')
            .setDescription('Echos the content')
            .addStringOption((option) =>
                option
                    .setName('content')
                    .setDescription('Content to echo')
                    .setRequired(true)
            )
    )

export async function execute(interaction: CommandInteraction) {
    switch (interaction.options.getSubcommand()) {
        case 'echo': {
            await echo.execute(interaction)
            break
        }
    }
}
