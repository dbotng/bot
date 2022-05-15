import { CommandInteraction } from 'discord.js'
import { Queue, Song } from 'distube'
import commandSuccessEmbedBuilder from '../../builders/commandSuccessEmbedBuilder'

export const name = 'addSong'

export const once = false

export async function execute(_: Queue, song: Song) {
    const interaction: CommandInteraction = global.musicQueues.get(
        `${song.member?.guild.id}_${song.member?.id}`
    )
    await interaction.editReply({
        embeds: [
            new commandSuccessEmbedBuilder().create(
                `[${song.name}](${song.url}) by [${song.uploader.name}](${song.uploader.url}) (author might not be correct) has been added to queue.`
            ),
        ],
    })
    global.musicQueues.delete(`${song.member?.guild.id}_${song.member?.id}`)
}
