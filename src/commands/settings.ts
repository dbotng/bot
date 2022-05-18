import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

import * as get from './settings/get'
import * as change from './settings/change'

export const data = new SlashCommandBuilder()
    .setName('settings')
    .setDescription('Settings commands')
    .addSubcommand(get.data)
    .addSubcommandGroup(change.data)

export async function execute(interaction: CommandInteraction) {
    switch (interaction.options.getSubcommand()) {
        case 'get': {
            await get.execute(interaction)
            break
        }
        default: {
            switch (interaction.options.getSubcommandGroup()) {
                case 'change': {
                    await change.execute(interaction)
                    break
                }
            }
        }
    }
}
