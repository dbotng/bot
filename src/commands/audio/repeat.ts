import {
    ChatInputCommandInteraction,
    SlashCommandStringOption,
    SlashCommandSubcommandBuilder,
} from 'discord.js'
import commandSuccessEmbedBuilder from '@tankbot/builders/embeds/commandSuccessEmbedBuilder.js'
import * as distube from '@tankbot/clients/distube.js'

import * as voice from '@tankbot/util/voice.js'

export const data = new SlashCommandSubcommandBuilder()
    .setName('repeat')
    .setDescription('Set repeat mode')
    .addStringOption(arg1)

function arg1(option: SlashCommandStringOption) {
    return option.setName('mode').setDescription('Mode to repeat')
}

enum Repeat {
    off,
    song,
    queue,
}

export async function execute(interaction: ChatInputCommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const guildId = interaction.guildId!
    const queue = distube.client.getQueue(guildId)
    if (await voice.userCheck(interaction, queue)) {
        return
    } else if (await voice.songCheck(interaction, queue)) {
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
