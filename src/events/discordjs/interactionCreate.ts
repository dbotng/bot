import { Interaction } from 'discord.js'
import * as cooldown from '../../common/cooldown'
import errorEmbedBuilder from '../../builders/errorEmbedBuilder'

export const name = 'interactionCreate'

export const once = false

export async function execute(interaction: Interaction) {
    if (!interaction.isCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) return

    try {
        cooldown.check(interaction)
        if (interaction.replied) return
        await command.execute(interaction)
        cooldown.create(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply({
            embeds: [new errorEmbedBuilder(`\`\`\`${error}\`\`\``).create()],
            ephemeral: true,
        })
    }
}
