import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

import * as get from './settings/get'

export const data = new SlashCommandBuilder()
    .setName('settings')
    .setDescription('Settings commands')
    .addSubcommand((command) =>
        command.setName('get').setDescription('Get all settings')
    )

export async function execute(interaction: CommandInteraction) {
    switch (interaction.options.getSubcommand()) {
        case 'get': {
            await get.execute(interaction)
            break
        }
    }
}
