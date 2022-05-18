import { SlashCommandSubcommandGroupBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

import * as cooldown_time from './change/cooldown_time'
import * as cooldown_commands from './change/cooldown_commands'

export const data = new SlashCommandSubcommandGroupBuilder()
    .setName('change')
    .setDescription('Change settings')
    .addSubcommand(cooldown_time.data)
    .addSubcommand(cooldown_commands.data)

export async function execute(interaction: CommandInteraction) {
    switch (interaction.options.getSubcommand()) {
        case 'cooldown_time': {
            break
        }
        case 'cooldown_commands': {
            break
        }
    }
}
