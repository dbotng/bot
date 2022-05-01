import { Interaction } from 'discord.js'
import * as cooldown from '../../common/cooldown'
import humanizeDuration from 'humanize-duration'
import embedBuilder from '../../builders/embedBuilder'
import errorEmbedBuilder from '../../builders/errorEmbedBuilder'

export const name = 'interactionCreate'

export const once = false

export async function execute(interaction: Interaction): Promise<void> {
    if (!interaction.isCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) return

    try {
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        if (
            cooldown.check(
                interaction.guildId!,
                interaction.channelId,
                interaction.user.id,
                interaction.commandName,
                interaction.options.getSubcommand()
            ) == true
        ) {
            await interaction.reply({
                embeds: [
                    new embedBuilder(
                        'Cooldown is active!',
                        `Please wait for ${humanizeDuration(
                            global.cooldown.get(
                                `${interaction.guildId!}_${
                                    interaction.channelId
                                }_${interaction.user.id}_${
                                    interaction.commandName
                                }_${interaction.options.getSubcommand()}`
                            ) - Date.now()
                        )} before trying.`
                    ).create(),
                ],
            })
            return
        }
        /* eslint-enable */
        await command.execute(interaction)
        cooldown.create(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            interaction.guildId!,
            interaction.channelId,
            interaction.user.id,
            interaction.commandName,
            interaction.options.getSubcommand()
        )
    } catch (error) {
        console.error(error)
        await interaction.reply({
            embeds: [new errorEmbedBuilder(`\`\`\`${error}\`\`\``).create()],
            ephemeral: true,
        })
    }
}
