import { CommandInteraction, GuildMember } from 'discord.js'
import { Queue } from 'distube'
import userErrorEmbedBuilder from '../builders/userErrorEmbedBuilder'

export async function userCheck(
    interaction: CommandInteraction,
    queue: Queue | undefined
) {
    if (
        queue instanceof Queue &&
        interaction.options.getSubcommand() != ('playing' || 'queue') &&
        interaction.member instanceof GuildMember &&
        (!interaction.member.voice.channel ||
            interaction.member.voice.channel != queue.voiceChannel)
    )
        await interaction.reply({
            embeds: [
                new userErrorEmbedBuilder().create(
                    `You must be in ${queue.voiceChannel?.name} to do this action.`
                ),
            ],
        })
    else if (
        typeof queue === 'undefined' &&
        interaction.options.getSubcommand() != 'play'
    )
        await interaction.reply({
            embeds: [
                new userErrorEmbedBuilder().create(
                    'You or someone must have music playing in queue to do this action.'
                ),
            ],
        })
    else return
}

export async function songCheck(
    interaction: CommandInteraction,
    queue: Queue | undefined
) {
    if (
        queue instanceof Queue &&
        queue.songs[0].streamURL?.includes('https://stream01.ungrounded.net/')
    )
        await interaction.reply({
            embeds: [
                new userErrorEmbedBuilder().create(
                    'Radio mode is enabled. Please do `/audio stop`, add a song and try again.'
                ),
            ],
        })
}
