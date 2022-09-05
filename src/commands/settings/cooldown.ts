import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandGroupBuilder,
} from 'discord.js'

import * as time from '@d-bot/commands/settings/cooldown/time.js'
import * as commands from '@d-bot/commands/settings/cooldown/commands.js'

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
