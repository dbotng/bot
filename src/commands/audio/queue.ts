import { CommandInteraction } from 'discord.js'
import embedBuilder from '../../builders/embedBuilder'
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
    let musicList = ''
    for (let i = 0; i < 6; i++) {
        if (queue?.songs[i]) {
            musicList += `• ${queue?.songs[i].name} by ${queue?.songs[i].uploader.name}, requested by <@!${queue.songs[i].member?.id}>\n`
        }
    }
    await interaction.reply({
        embeds: [
            new embedBuilder().create(
                'Queue',
                `Next 5 songs in queue (author might not be correct):\n ${musicList}`
            ),
        ],
    })
}
