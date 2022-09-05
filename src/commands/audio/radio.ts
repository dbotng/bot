import {
    ChatInputCommandInteraction,
    GuildMember,
    SlashCommandSubcommandBuilder,
} from 'discord.js'
import * as distube from '@d-bot/clients/distube.js'

import * as voice from '@d-bot/util/voice.js'

export const data = new SlashCommandSubcommandBuilder()
    .setName('radio')
    .setDescription('Play from Newgrounds radio')

export async function execute(interaction: ChatInputCommandInteraction) {
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
