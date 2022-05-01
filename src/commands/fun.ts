import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

import * as echo from './fun/echo'
import embedBuilder from '../builders/embedBuilder'

export const data = new SlashCommandBuilder()
    .setName('fun')
    .setDescription('Fun commands')
    .addSubcommand((command) =>
        command
            .setName('echo')
            .setDescription('Echos the content')
            .addStringOption((option) =>
                option
                    .setName('content')
                    .setDescription('Content to echo')
                    .setRequired(true)
            )
    )
    .addSubcommand((command) =>
        command.setName('testembed').setDescription('test embedding')
    )

export async function execute(interaction: CommandInteraction): Promise<void> {
    switch (interaction.options.getSubcommand()) {
        case 'echo': {
            await echo.execute(interaction)
            break
        }
        case 'testembed': {
            await interaction.reply({
                embeds: [
                    new embedBuilder(
                        'hello',
                        'this is a cooldown test'
                    ).create(),
                ],
            })
        }
    }
}
