import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
} from 'discord.js'
import commandSuccessEmbedBuilder from '@tankbot/builders/embeds/commandSuccessEmbedBuilder.js'
import * as distube from '@tankbot/clients/distube.js'

import * as voice from '@tankbot/util/voice.js'

export const data = new SlashCommandSubcommandBuilder()
    .setName('pause')
    .setDescription('Pause the audio')

export async function execute(interaction: ChatInputCommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const guildId = interaction.guildId!
    const queue = distube.client.getQueue(guildId)
    if (await voice.userCheck(interaction, queue)) {
        return
    } else if (await voice.songCheck(interaction, queue)) {
        return
    }
    distube.client.pause(guildId)
    await interaction.reply({
        embeds: [new commandSuccessEmbedBuilder().create('Song is paused.')],
    })
}
