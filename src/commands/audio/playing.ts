import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
} from 'discord.js'
import embedBuilder from '@d-bot/builders/embeds/embedBuilder.js'
import * as distube from '@d-bot/clients/distube.js'
import phin from 'phin'

import * as voice from '@d-bot/util/voice.js'
import * as radio from '@d-bot/types/newgrounds/radio.js'

export const data = new SlashCommandSubcommandBuilder()
    .setName('playing')
    .setDescription("See what's playing")

export async function execute(interaction: ChatInputCommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const guildId = interaction.guildId!
    const queue = distube.client.getQueue(guildId)
    if (await voice.userCheck(interaction, queue)) return
    if (
        queue?.songs[0].streamURL?.includes(
            'https://stream.newgroundsradio.com/'
        )
    ) {
        await interaction.deferReply();
        const response = (
            (
                await phin({
                    url: 'https://api.newgroundsradio.com/v1/status',
                    parse: 'json',
                })
            ).body as radio.status
        ).data
        const url = response.title
            .match(/\((https:\/\/).+\)/g)?.[0]
            .slice(1, -1)

        const isLive = response.is_live

        const songInfo = isLive
            ? response.title.match(/[[LIVE\]: ]*(.+) \((.+)\)/)
            : response.title.match(/(.+) - (.+) \((.+\/([0-9]+))\)/)
        let thumbnail = isLive
            ? 'https://img.ngfiles.com/defaults/icon-audio.png'
            : `https://aicon.ngfiles.com/${songInfo?.[4]
                  .slice(0, -3)}/${songInfo?.[4]}.png`

        if (thumbnail != 'https://img.ngfiles.com/defaults/icon-audio.png' && (await phin({ url: thumbnail })).statusCode != 200) {
            thumbnail = 'https://img.ngfiles.com/defaults/icon-audio.png'
        }

        await interaction.editReply({
            embeds: [
                new embedBuilder()
                    .create(
                        isLive ? 'Live now' : 'Playing now',
                        isLive
                            ? `[${songInfo?.[1]}](${songInfo?.[2]}) at Newgrounds Radio`
                            : `[${songInfo?.[2]}](${songInfo?.[3]}) by [${songInfo?.[1]}](https://${songInfo?.[1]}.newgrounds.com) at Newgrounds Radio`
                    )
                    .addFields({
                        name: 'Requested by',
                        value: `<@!${queue?.songs[0].member?.id}>`,
                    })
                    .setThumbnail(thumbnail),
            ],
        })
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
                    .setThumbnail(queue?.songs[0].thumbnail as string),
            ],
        })
    }
}
