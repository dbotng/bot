import { Interaction } from 'discord.js'
import * as cooldown from '../../util/cooldown'
import commandErrorEmbedBuilder from '../../builders/commandErrorEmbedBuilder'

export const name = 'interactionCreate'

export const once = false

export async function execute(interaction: Interaction) {
    if (!interaction.isCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) return

    if (await cooldown.check(interaction)) return

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply({
            embeds: [
                new commandErrorEmbedBuilder().create(`\`\`\`${error}\`\`\``),
            ],
        })
    }

    cooldown.create(interaction)
}
