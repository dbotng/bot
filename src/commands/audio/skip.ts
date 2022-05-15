import { CommandInteraction } from 'discord.js'
import commandSuccessEmbedBuilder from '../../builders/commandSuccessEmbedBuilder'
import userErrorEmbedBuilder from '../../builders/userErrorEmbedBuilder'
import * as distube from '../../clients/distube'

import * as voice from '../../common/voice'

export async function execute(interaction: CommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const guildId = interaction.guildId!
    const queue = distube.client.getQueue(guildId)
    voice.userCheck(interaction, queue)
    if (interaction.replied) return
    voice.songCheck(interaction, queue)
    if (interaction.replied) return
    if (!queue?.songs[1]) {
        new userErrorEmbedBuilder().create(
            'No music next in queue. Either add songs, use /audio stop or use /audio leave instead.'
        )
        return
    }
    distube.client.skip(guildId)
    await interaction.reply({
        embeds: [
            new commandSuccessEmbedBuilder().create(
                `Skipped to ${queue?.songs[0].name} by ${queue?.songs[0].uploader.name}, requested by <@!${queue?.songs[0].member?.id}>`
            ),
        ],
    })
}
