import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

import * as connect from './user/connect'
import * as disconnect from './user/disconnect'
import * as fetch from './user/fetch'

export const data = new SlashCommandBuilder()
    .setName('user')
    .setDescription('Newgrounds User commands')
    .addSubcommand(connect.data)
    .addSubcommand(disconnect.data)
    .addSubcommand(fetch.data)

export async function execute(interaction: CommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
