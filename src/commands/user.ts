import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

import * as connect from '@tankbot/commands/user/connect.js'
import * as disconnect from '@tankbot/commands/user/disconnect.js'
import * as fetch from '@tankbot/commands/user/fetch.js'

export const data = new SlashCommandBuilder()
    .setName('user')
    .setDescription('Newgrounds User commands')
    .addSubcommand(connect.data)
    .addSubcommand(disconnect.data)
    .addSubcommand(fetch.data)

export async function execute(interaction: ChatInputCommandInteraction) {
    switch (interaction.options.getSubcommand()) {
        case 'connect': {
            connect.execute(interaction)
            break
        }
        case 'disconnect': {
            disconnect.execute(interaction)
            break
        }
        case 'fetch': {
            fetch.execute(interaction)
            break
        }
    }
}
