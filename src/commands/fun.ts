import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

import * as echo from '@tankbot/commands/fun/echo.js'

export const data = new SlashCommandBuilder()
    .setName('fun')
    .setDescription('Fun commands')
    .addSubcommand(echo.data)

export async function execute(interaction: ChatInputCommandInteraction) {
    switch (interaction.options.getSubcommand()) {
        case 'echo': {
            await echo.execute(interaction)
            break
        }
    }
}
