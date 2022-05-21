import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

import * as devbot from './info/devbot'
import * as bot from './info/bot'
import * as invite from './info/invite'

export const data = new SlashCommandBuilder()
    .setName('info')
    .setDescription('Information commands')
    .addSubcommand(devbot.data)
    .addSubcommand(bot.data)
    .addSubcommand(invite.data)

export async function execute(interaction: CommandInteraction) {
    switch (interaction.options.getSubcommand()) {
        case 'devbot': {
            await devbot.execute(interaction)
            break
        }
        case 'bot': {
            await bot.execute(interaction)
            break
        }
        case 'invite': {
            await invite.execute(interaction)
            break
        }
    }
}
