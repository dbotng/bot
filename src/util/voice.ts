import { CommandInteraction, GuildMember } from 'discord.js'
import { Queue } from 'distube'
import userErrorEmbedBuilder from '../builders/embeds/userErrorEmbedBuilder'

export async function userCheck(
    interaction: CommandInteraction,
    queue: Queue | undefined
) {
    if (interaction.options.getSubcommand() != ('playing' || 'queue')) {
        if (!(interaction.member as GuildMember).voice.channel) {
            await interaction.reply({
                embeds: [
                    new userErrorEmbedBuilder().create(
                        `You must be in a voice channel to do this action.`
                    ),
                ],
            })
            return true
        } else if (
            queue instanceof Queue &&
            (interaction.member as GuildMember).voice.channel !=
                queue.voiceChannel
        ) {
            await interaction.reply({
                embeds: [
                    new userErrorEmbedBuilder().create(
                        `You must be in ${queue.voiceChannel?.name} to do this action.`
                    ),
                ],
            })
            return true
        }
    } else if (
        typeof queue === 'undefined' &&
        interaction.options.getSubcommand() != 'play'
    ) {
        await interaction.reply({
            embeds: [
                new userErrorEmbedBuilder().create(
                    'You or someone must have music playing in queue to do this action.'
                ),
            ],
        })
        return true
    }
    return false
}

export async function songCheck(
    interaction: CommandInteraction,
    queue: Queue | undefined
) {
    if (
        queue instanceof Queue &&
        queue.songs[0].streamURL?.includes('https://stream.newgroundsradio.com/')
    ) {
        await interaction.reply({
            embeds: [
                new userErrorEmbedBuilder().create(
                    'Radio mode is enabled. Please do `/audio stop`, add a song and try again.'
                ),
            ],
        })
        return true
    }
    return false
}
