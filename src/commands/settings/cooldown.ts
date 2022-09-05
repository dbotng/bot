import { SlashCommandSubcommandGroupBuilder } from '@discordjs/builders'
import { ChatInputCommandInteraction } from 'discord.js'

import * as time from './cooldown/time'
import * as commands from './cooldown/commands'

export const data = new SlashCommandSubcommandGroupBuilder()
    .setName('cooldown')
    .setDescription('Change cooldown-related')
    .addSubcommand(time.data)
    .addSubcommand(commands.data)

export async function execute(interaction: ChatInputCommandInteraction) {
    switch (interaction.options.getSubcommand()) {
        case 'time': {
            await time.execute(interaction)
            break
        }
        case 'commands': {
            await commands.execute(interaction)
            break
        }
    }
}
