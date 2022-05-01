import { Interaction } from 'discord.js'
import * as cooldown from '../../common/cooldown'
import humanizeDuration from 'humanize-duration'
import embedBuilder from '../../builders/embedBuilder'
import errorEmbedBuilder from '../../builders/errorEmbedBuilder'

export const name = 'interactionCreate'

export const once = false

export async function execute(interaction: Interaction) {
    if (!interaction.isCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) return

    try {
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        cooldown.check(interaction)
        if (interaction.replied) return
        /* eslint-enable */
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
