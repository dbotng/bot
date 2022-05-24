import {
    SlashCommandStringOption,
    SlashCommandSubcommandBuilder,
} from '@discordjs/builders'
import { CommandInteraction, GuildMember } from 'discord.js'
import * as distube from '../../clients/distube'

import * as voice from '../../util/voice'
import * as radio from '../../types/radio'

export const data = new SlashCommandSubcommandBuilder()
    .setName('radio')
    .setDescription('Play from Newgrounds radio')
    .addStringOption(arg1)

function arg1(option: SlashCommandStringOption) {
    return option
        .setName('station')
        .setDescription('Newgrounds Radio station')
        .addChoices(Object.entries(radio.stations))
        .setRequired(true)
}

export async function execute(interaction: CommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const guildId = interaction.guildId!
    const queue = distube.client.getQueue(guildId)
    const member = interaction.member as GuildMember
    if (await voice.userCheck(interaction, queue)) return
    if (queue) distube.client.stop(guildId)
    distube.client
        .play(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            member.voice.channel!,
            `https://stream01.ungrounded.net/${interaction.options.getString(
                'station'
            )}`,
            {
                member: member,
            }
        )
        .then(async () => {
            await interaction.deferReply()
        })
    global.musicQueues.set(`${interaction.guildId}_${member.id}`, interaction)
}
