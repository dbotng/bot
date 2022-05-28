import { TextChannel } from 'discord.js'
import commandErrorEmbedBuilder from '../../builders/embeds/commandErrorEmbedBuilder'

export const name = 'error'

export const once = false

export async function execute(channel: TextChannel, error: Error) {
    if (channel)
        channel.send({
            embeds: [new commandErrorEmbedBuilder().create(error.message)],
        })
    else console.error(error)
}
