import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
} from 'discord.js'
import commandSuccessEmbedBuilder from '@tankbot/builders/embeds/commandSuccessEmbedBuilder.js'
import userErrorEmbedBuilder from '@tankbot/builders/embeds/userErrorEmbedBuilder.js'
import * as distube from '@tankbot/clients/distube.js'

import * as voice from '@tankbot/util/voice.js'

export const data = new SlashCommandSubcommandBuilder()
    .setName('skip')
    .setDescription('Skip to the next song in the queue')

export async function execute(interaction: ChatInputCommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const guildId = interaction.guildId!
    const queue = distube.client.getQueue(guildId)
    if (await voice.userCheck(interaction, queue)) {
        return
    } else if (await voice.songCheck(interaction, queue)) {
        return
    }
    if (!queue?.songs[1]) {
        new userErrorEmbedBuilder().create(
            'No music next in queue. Either add songs, use /audio stop or use /audio leave instead.'
        )
        return
    }
    distube.client.skip(guildId).then(async () => {
        await interaction.reply({
            embeds: [
                new commandSuccessEmbedBuilder().create(
                    `Skipped to ${queue?.songs[0].name} by ${queue?.songs[0].uploader.name}, requested by <@!${queue?.songs[0].member?.id}>`
                ),
            ],
        })
    })
}
