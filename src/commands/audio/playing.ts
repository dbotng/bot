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
    if (
        queue?.songs[0].streamURL?.includes('https://stream01.ungrounded.net/')
    ) {
        // TODO
    } else {
        await interaction.reply({
            embeds: [
                new embedBuilder()
                    .create(
                        'Playing now',
                        `[${queue?.songs[0].name}](${queue?.songs[0].url}) by [${queue?.songs[0].uploader.name}](${queue?.songs[0].uploader.url}) (author might not be correct)`
                    )
                    .addFields(
                        {
                            name: 'Listens',
                            value: `${queue?.songs[0].views}`,
                        },
                        {
                            name: 'Duration',
                            value: `${queue?.formattedCurrentTime}/${queue?.songs[0].formattedDuration}`,
                        },
                        {
                            name: 'Requested by',
                            value: `<@!${queue?.songs[0].member?.id}>`,
                        }
                    )
                    .setThumbnail(`${queue?.songs[0].thumbnail}`),
            ],
        })
    }
}
