import { ChatInputCommandInteraction } from 'discord.js'
import { Queue, Song } from 'distube'
import commandSuccessEmbedBuilder from '@d-bot/builders/embeds/commandSuccessEmbedBuilder.js'

export const name = 'addSong'

export const once = false

export async function execute(_: Queue, song: Song) {
    const interaction: ChatInputCommandInteraction = global.musicQueues.get(
        `${song.member?.guild.id}_${song.member?.id}`
    )
    if (song.streamURL?.includes('https://stream.newgroundsradio.com/')) {
        await interaction.editReply({
            embeds: [
                new commandSuccessEmbedBuilder().create(
                    `Newgrounds Radio is now playing.`
                ),
            ],
        })
    } else {
        await interaction.editReply({
            embeds: [
                new commandSuccessEmbedBuilder().create(
                    `[${song.name}](${song.url}) by [${song.uploader.name}](${song.uploader.url}) (author might not be correct) has been added to queue.`
                ),
            ],
        })
    }
    global.musicQueues.delete(`${song.member?.guild.id}_${song.member?.id}`)
}
