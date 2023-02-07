import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
} from 'discord.js'
import commandSuccessEmbedBuilder from '@tankbot/builders/embeds/commandSuccessEmbedBuilder.js'
import * as distube from '@tankbot/clients/distube.js'

import * as voice from '@tankbot/util/voice.js'

export const data = new SlashCommandSubcommandBuilder()
    .setName('leave')
    .setDescription('Stop the audio, deletes the queue and leave the channel')

export async function execute(interaction: ChatInputCommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const guildId = interaction.guildId!
    const queue = distube.client.getQueue(guildId)
    if (await voice.userCheck(interaction, queue)) return
    distube.client.stop(guildId)
    distube.client.voices.leave(guildId)
    await interaction.reply({
        embeds: [
            new commandSuccessEmbedBuilder().create(
                'Left the VC, see ya bitches!'
            ),
        ],
    })
}
