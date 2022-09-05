import { ChatInputCommandInteraction, SlashCommandSubcommandBuilder } from 'discord.js'
import commandSuccessEmbedBuilder from '@d-bot/builders/embeds/commandSuccessEmbedBuilder.js'
import * as distube from '@d-bot/clients/distube.js'

import * as voice from '@d-bot/util/voice.js'

export const data = new SlashCommandSubcommandBuilder()
    .setName('stop')
    .setDescription('Stop the audio and deletes the queue')

export async function execute(interaction: ChatInputCommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const guildId = interaction.guildId!
    const queue = distube.client.getQueue(guildId)
    if (await voice.userCheck(interaction, queue)) return
    if (interaction.replied) return
    distube.client.stop(guildId).then(async () => {
        await interaction.reply({
            embeds: [
                new commandSuccessEmbedBuilder().create(
                    `Song has been stopped.`
                ),
            ],
        })
    })
}
