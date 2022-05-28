import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

import * as get from './settings/get'
import * as cooldown from './settings/cooldown'
import userErrorEmbedBuilder from '../builders/userErrorEmbedBuilder'

export const data = new SlashCommandBuilder()
    .setName('settings')
    .setDescription('Settings commands')
    .addSubcommand(get.data)
    .addSubcommandGroup(cooldown.data)

export async function execute(interaction: CommandInteraction) {
    if (!interaction.memberPermissions?.has('ADMINISTRATOR')) {
        await interaction.reply({
            embeds: [
                new userErrorEmbedBuilder().create(
                    "You don't have sufficient permissions to run the command."
                ),
            ],
        })
        return
    }
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
