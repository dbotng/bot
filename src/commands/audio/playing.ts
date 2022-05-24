import { SlashCommandSubcommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import embedBuilder from '../../builders/embedBuilder'
import * as distube from '../../clients/distube'

import { fetch } from '../../util/fetch'
import getEnumKeyByEnumValue from '../../util/getEnumKeyByEnumValue'

import * as voice from '../../util/voice'
import * as radio from '../../types/radio'

export const data = new SlashCommandSubcommandBuilder()
    .setName('playing')
    .setDescription("See what's playing")

export async function execute(interaction: CommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const guildId = interaction.guildId!
    const queue = distube.client.getQueue(guildId)
    if (await voice.userCheck(interaction, queue)) return
    if (
        queue?.songs[0].streamURL?.includes('https://stream01.ungrounded.net/')
    ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const station = queue?.songs[0].streamURL.replace(
            'https://stream01.ungrounded.net/',
            ''
        )
        const songInfo = (
            (await (
                await fetch(
                    'https://stream01.ungrounded.net/status-json-custom.xsl'
                )
            ).json()) as radio.status
        ).mounts[`/${station}`]
        const url = songInfo.current_song
            .match(/\((https:\/\/).+\)/g)?.[0]
            .slice(1, -1)
        const title = songInfo.current_song.match(/- .+ /g)?.[0].slice(2, -1)
        const author = songInfo.current_song.match(/.+ -/g)?.[0].slice(0, -2)
        const thumbnail = `https://aicon.ngfiles.com/${url
            ?.match(/[0-9]+/g)?.[0]
            .slice(0, -3)}/${url?.match(/[0-9]+/g)?.[0]}.png`

        await interaction.reply({
            embeds: [
                new embedBuilder()
                    .create(
                        'Playing now',
                        `[${title}](${url}) by [${author}](https://${author}.newgrounds.com) at ${getEnumKeyByEnumValue(
                            radio.stations,
                            station
                        )}`
                    )
                    .addField(
                        'Requested by',
                        `<@!${queue?.songs[0].member?.id}>`
                    )
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
