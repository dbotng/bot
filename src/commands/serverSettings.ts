import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

import * as get from './settings/get'
import * as cooldown from './settings/cooldown'

export const data = new SlashCommandBuilder()
    .setName('settings')
    .setDescription('Settings commands')
    .addSubcommand(get.data)
    .addSubcommandGroup(cooldown.data)

export async function execute(interaction: CommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    switch (interaction.options.getSubcommand()) {
        case 'get': {
            await get.execute(interaction)
            break
        }
        default: {
            switch (interaction.options.getSubcommandGroup()) {
                case 'cooldown':
                    await cooldown.execute(interaction)
                    break
            }
        }
    }
}
