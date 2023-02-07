import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
} from 'discord.js'
import embedBuilder from '@tankbot/builders/embeds/embedBuilder.js'
import * as distube from '@tankbot/clients/distube.js'

import * as voice from '@tankbot/util/voice.js'
import * as radio from '@tankbot/types/newgrounds/radio.js'
import * as feed from '@tankbot/types/newgrounds/audioFeed.js'

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
        await interaction.deferReply()
        const radioResponse = (
            (await fetch('https://api.newgroundsradio.com/v1/status'))
                .json as unknown as radio.response
        ).data

        const isLive = radioResponse.live

        const feedResponse = isLive
            ? undefined
            : ((
                  await fetch(
                      `https://www.newgrounds.com/audio/feed/${radioResponse.audio_id}`
                  )
              ).json as unknown as feed.response)

        const liveTitle = isLive
            ? radioResponse.title
                ? radioResponse.title.match(/[[LIVE\]: ]*(.+) \((.+)\)/)
                : ['', 'We are live!', 'https://discord.gg/ngp']
            : undefined

        const thumbnail = !feedResponse
            ? 'https://img.ngfiles.com/defaults/icon-audio.png'
            : feedResponse.icons.large

        await interaction.editReply({
            embeds: [
                new embedBuilder()
                    .create(
                        isLive ? 'Live now' : 'Playing now',
                        isLive
                            ? `[${liveTitle?.[1]}](${liveTitle?.[2]}) at Newgrounds Radio`
                            : `[${feedResponse?.title}](${feedResponse?.url}) by [${feedResponse?.authors[0].name}](https://${feedResponse?.authors[0].id}.newgrounds.com) at Newgrounds Radio`
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
