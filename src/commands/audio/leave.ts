import { CommandInteraction } from 'discord.js'
import commandSuccessEmbedBuilder from '../../builders/commandSuccessEmbedBuilder'
import * as distube from '../../clients/distube'

import * as voice from '../../common/voice'

export async function execute(interaction: CommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const guildId = interaction.guildId!
    const queue = distube.client.getQueue(guildId)
    voice.userCheck(interaction, queue)
    if (interaction.replied) return
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
