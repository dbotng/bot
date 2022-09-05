import { ChatInputCommandInteraction, GuildMember, SlashCommandStringOption, SlashCommandSubcommandBuilder } from 'discord.js'
import commandSuccessEmbedBuilder from '@d-bot/builders/embeds/commandSuccessEmbedBuilder.js'
import userErrorEmbedBuilder from '@d-bot/builders/embeds/userErrorEmbedBuilder.js'
import * as distube from '@d-bot/clients/distube.js'
import 'dotenv/config'

import * as voice from '@d-bot/util/voice.js'

export const data = new SlashCommandSubcommandBuilder()
    .setName('play')
    .setDescription('Play audio from Newgrounds')
    .addStringOption(arg1)

function arg1(option: SlashCommandStringOption) {
    return option.setName('link').setDescription('Newgrounds audio link')
}

export async function execute(interaction: ChatInputCommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const guildId = interaction.guildId!
    const queue = distube.client.getQueue(guildId)
    const link = interaction.options.getString('link')
    const member = interaction.member as GuildMember
    if (await voice.userCheck(interaction, queue)) return
    if (queue?.paused) {
        distube.client.resume(guildId)
        await interaction.reply({
            embeds: [
                new commandSuccessEmbedBuilder().create('Song is unpaused.'),
            ],
        })
    } else if (
        !link ||
        (!link.includes('newgrounds.com') &&
            member.id != interaction.client.application?.owner?.id)
    ) {
        await interaction.reply({
            embeds: [
                new userErrorEmbedBuilder().create(
                    'You must have a link from Newgrounds to add a song to queue.'
                ),
            ],
        })
    } else if (
        queue?.songs[0].streamURL?.includes('https://stream.newgroundsradio.com/')
    ) {
        distube.client.stop(guildId)
    } else {
        await interaction.deferReply()
        distube.client
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .play(member.voice.channel!, link, {
                member: member,
            })
        global.musicQueues.set(
            `${interaction.guildId}_${member.id}`,
            interaction
        )
    }
}
