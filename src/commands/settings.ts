import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

import * as get from '@tankbot/commands/settings/get.js'
import * as cooldown from '@tankbot/commands/settings/cooldown.js'
import userErrorEmbedBuilder from '@tankbot/builders/embeds/userErrorEmbedBuilder.js'

export const data = new SlashCommandBuilder()
    .setName('settings')
    .setDescription('Settings commands')
    .addSubcommand(get.data)
    .addSubcommandGroup(cooldown.data)

export async function execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.memberPermissions?.has('Administrator')) {
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
