import { SlashCommandSubcommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import commandSuccessEmbedBuilder from '../../builders/commandSuccessEmbedBuilder'
import * as distube from '../../clients/distube'

import * as voice from '../../util/voice'

export const data = new SlashCommandSubcommandBuilder()
    .setName('stop')
    .setDescription('Stop the audio and deletes the queue')

export async function execute(interaction: CommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const guildId = interaction.guildId!
    const queue = distube.client.getQueue(guildId)
    if (await voice.userCheck(interaction, queue)) return
    if (interaction.replied) return
    distube.client.stop(guildId).then(async () => {
        await interaction.reply({
            embeds: [
                new commandSuccessEmbedBuilder().create(
                    `Song has been stopped.`
                ),
            ],
        })
    })
}
