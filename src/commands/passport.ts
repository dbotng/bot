import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

import * as login from './passport/login'
import * as logout from './passport/logout'

export const data = new SlashCommandBuilder()
    .setName('passport')
    .setDescription('NG Passport commands')
    .addSubcommand(login.data)
    .addSubcommand(logout.data)

export async function execute(interaction: CommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    switch (interaction.options.getSubcommand()) {
        case 'login': {
            break
        }
        case 'logout': {
            break
        }
    }
}
