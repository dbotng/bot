import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
} from 'discord.js'
import embedBuilder from '@d-bot/builders/embeds/embedBuilder.js'
import * as distube from '@d-bot/clients/distube.js'

import * as voice from '@d-bot/util/voice.js'

export const data = new SlashCommandSubcommandBuilder()
    .setName('queue')
    .setDescription("See what's next on the queue")

export async function execute(interaction: ChatInputCommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const guildId = interaction.guildId!
    const queue = distube.client.getQueue(guildId)
    if (
        (await voice.userCheck(interaction, queue)) &&
        (await voice.songCheck(interaction, queue))
    ) {
        return
    }
    let musicList = ''
    for (let i = 0; i < 6; i++) {
        if (queue?.songs[i]) {
            musicList += `• ${queue?.songs[i].name} by ${queue?.songs[i].uploader.name}, requested by <@!${queue.songs[i].member?.id}>\n`
        }
    }
    await interaction.reply({
        embeds: [
            new embedBuilder().create(
                'Queue',
                `Next 5 songs in queue (author might not be correct):\n${musicList}`
            ),
        ],
    })
}
