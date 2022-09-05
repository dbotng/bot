import {
    ChatInputCommandInteraction,
    SlashCommandNumberOption,
    SlashCommandSubcommandBuilder,
} from 'discord.js'
import commandSuccessEmbedBuilder from '@d-bot/builders/embeds/commandSuccessEmbedBuilder.js'
import * as distube from '@d-bot/clients/distube.js'

import * as voice from '@d-bot/util/voice.js'

export const data = new SlashCommandSubcommandBuilder()
    .setName('volume')
    .setDescription('Set volume')
    .addNumberOption(arg1)

function arg1(option: SlashCommandNumberOption) {
    return option
        .setName('percent')
        .setDescription('The volume percentage')
        .setRequired(true)
}

export async function execute(interaction: ChatInputCommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const guildId = interaction.guildId!
    const queue = distube.client.getQueue(guildId)
    if (await voice.userCheck(interaction, queue)) return
    distube.client.setVolume(
        guildId,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        interaction.options.getNumber('percent')!
    )
    await interaction.reply({
        embeds: [
            new commandSuccessEmbedBuilder().create(
                `Volume has set to ${interaction.options.getNumber('percent')}%`
            ),
        ],
    })
}
