import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

import * as devbot from '@d-bot/commands/info/devbot.js'
import * as bot from '@d-bot/commands/info/bot.js'
import * as invite from '@d-bot/commands/info/invite.js'

export const data = new SlashCommandBuilder()
    .setName('info')
    .setDescription('Information commands')
    .addSubcommand(devbot.data)
    .addSubcommand(bot.data)
    .addSubcommand(invite.data)

export async function execute(interaction: ChatInputCommandInteraction) {
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
