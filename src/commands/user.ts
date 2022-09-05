import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

import * as connect from '@d-bot/commands/user/connect.js'
import * as disconnect from '@d-bot/commands/user/disconnect.js'
import * as fetch from '@d-bot/commands/user/fetch.js'

export const data = new SlashCommandBuilder()
    .setName('user')
    .setDescription('Newgrounds User commands')
    .addSubcommand(connect.data)
    .addSubcommand(disconnect.data)
    .addSubcommand(fetch.data)

export async function execute(interaction: ChatInputCommandInteraction) {
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
