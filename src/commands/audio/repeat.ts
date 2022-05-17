import { CommandInteraction } from 'discord.js'
import commandSuccessEmbedBuilder from '../../builders/commandSuccessEmbedBuilder'
import * as distube from '../../clients/distube'

import * as voice from '../../common/voice'

enum Repeat {
    off,
    song,
    queue,
}

export async function execute(interaction: CommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const guildId = interaction.guildId!
    const queue = distube.client.getQueue(guildId)
    if (
        (await voice.userCheck(interaction, queue)) &&
        (await voice.songCheck(interaction, queue))
    ) {
        return
    }

    let result

    if (interaction.options.getString('mode')) {
        result = distube.client.setRepeatMode(
            guildId,
            (<never>Repeat)[
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                interaction.options.getString('mode')!.toLowerCase()
            ]
        )
    } else {
        result = distube.client.setRepeatMode(guildId)
    }

    await interaction.reply({
        embeds: [
            new commandSuccessEmbedBuilder().create(
                `Repeat mode is set to ${Repeat[result]}`
            ),
        ],
    })
}
