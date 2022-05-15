import { CommandInteraction, GuildMember } from 'discord.js'
import commandSuccessEmbedBuilder from '../../builders/commandSuccessEmbedBuilder'
import userErrorEmbedBuilder from '../../builders/userErrorEmbedBuilder'
import * as distube from '../../clients/distube'
import 'dotenv/config'

import * as voice from '../../common/voice'

export async function execute(interaction: CommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const guildId = interaction.guildId!
    const queue = distube.client.getQueue(guildId)
    const link = interaction.options.getString('link')
    voice.userCheck(interaction, queue)
    if (interaction.replied) return
    if (queue?.paused) {
        distube.client.resume(guildId)
        await interaction.reply({
            embeds: [
                new commandSuccessEmbedBuilder().create('Song is unpaused.'),
            ],
        })
        return
    }
    if (
        !link ||
        (!link.includes('newgrounds.com') &&
            interaction.member instanceof GuildMember &&
            interaction.member.id != process.env.token)
    ) {
        await interaction.reply({
            embeds: [
                new userErrorEmbedBuilder().create(
                    'You must have a link from Newgrounds to add a song to queue.'
                ),
            ],
        })
        return
    }
    if (
        queue?.songs[0].streamURL?.includes('https://stream01.ungrounded.net/')
    ) {
        distube.client.stop(guildId)
    }
    if (interaction.member instanceof GuildMember) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        distube.client.play(interaction.member.voice.channel!, link, {
            member: interaction.member,
        })
        await interaction.deferReply()
        global.musicQueues.set(
            `${interaction.guildId}_${interaction.member.id}`,
            interaction
        )
    }
}
