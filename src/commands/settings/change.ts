import { SlashCommandSubcommandGroupBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

import * as cooldownTime from './change/cooldownTime'
import * as cooldownCommands from './change/cooldownCommands'

export const data = new SlashCommandSubcommandGroupBuilder()
    .setName('change')
    .setDescription('Change settings')
    .addSubcommand(cooldownTime.data)
    .addSubcommand(cooldownCommands.data)

export async function execute(interaction: CommandInteraction) {
    switch (interaction.options.getSubcommand()) {
        case 'cooldownTime': {
            break
        }
        case 'cooldownCommands': {
            break
        }
    }
}
