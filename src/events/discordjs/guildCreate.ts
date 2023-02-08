import { ChannelType, PermissionFlagsBits } from 'discord-api-types/v10'
import { Guild, NonThreadGuildBasedChannel, TextChannel } from 'discord.js'
import embedBuilder from '@tankbot/builders/embeds/embedBuilder.js'
import * as createDatabase from '@tankbot/util/createDatabase.js'

export const name = 'guildCreate'

export const once = false

export async function execute(guild: Guild) {
    await createDatabase.databaseCreate(guild)
    guild.channels.fetch().then((channels) => {
        sendEmbed(channels?.filter(channelFilter).first())
    })
}

function channelFilter(channel: NonThreadGuildBasedChannel | null | undefined) {
    return (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        channel?.permissionsFor(channel.guild.members.me!, false)
            .has(PermissionFlagsBits.SendMessages) &&
        channel?.type == ChannelType.GuildText
    )
}

async function sendEmbed(channel: NonThreadGuildBasedChannel | null | undefined) {
    if (channel) {
        await (channel as TextChannel).send({
            embeds: [
                new embedBuilder()
                    .create(
                        'Thank you for inviting TankBot!',
                        'You can check out the commands by typing / in the textbox and mess around with the bot!'
                    )
                    .addFields({
                        name: 'Any questions?',
                        value: 'You can always join the [Discord server](https://discord.gg/gKgSnRQRCr) where you can ask questions (and chat with other people) and also the [Github repo](https://github.com/dbotng/bot) for submitting an issue!',
                    }),
            ],
        })
    }
}
