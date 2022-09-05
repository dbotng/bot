import { SlashCommandSubcommandBuilder } from '@discordjs/builders'
import { CommandInteraction, GuildMember } from 'discord.js'
import * as distube from '../../clients/distube'

import * as voice from '../../util/voice'

export const data = new SlashCommandSubcommandBuilder()
    .setName('radio')
    .setDescription('Play from Newgrounds radio')

export async function execute(interaction: CommandInteraction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const guildId = interaction.guildId!
    const queue = distube.client.getQueue(guildId)
    const member = interaction.member as GuildMember
    if (await voice.userCheck(interaction, queue)) return
    if (queue) distube.client.stop(guildId)
    await interaction.deferReply()
    distube.client.play(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        member.voice.channel!,
        'https://stream.newgroundsradio.com/radio.mp3',
        {
            member: member,
        }
    )
    global.musicQueues.set(`${interaction.guildId}_${member.id}`, interaction)
}
