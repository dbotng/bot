import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

import * as bot from '@tankbot/commands/info/bot.js'
import * as invite from '@tankbot/commands/info/invite.js'

export const data = new SlashCommandBuilder()
    .setName('info')
    .setDescription('Information commands')
    .addSubcommand(bot.data)
    .addSubcommand(invite.data)

export async function execute(interaction: ChatInputCommandInteraction) {
    switch (interaction.options.getSubcommand()) {
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
