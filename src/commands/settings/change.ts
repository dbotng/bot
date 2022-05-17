import { SlashCommandSubcommandGroupBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export const data = new SlashCommandSubcommandGroupBuilder()
    .setName('settings')
    .setDescription('Settings commands')
    .addSubcommand((command) =>
        command.setName('get').setDescription('Get all settings')
    )
    .addSubcommand((command) =>
        command.setName('change').setDescription('Change settings')
    )

export async function execute(interaction: CommandInteraction) {
    switch (interaction.options.getSubcommand()) {
        case 'get': {
            break
        }
    }
}
