import { PermissionFlagsBits } from 'discord-api-types/v10'
import { Guild, NonThreadGuildBasedChannel, TextChannel } from 'discord.js'
import embedBuilder from '../../builders/embedBuilder'
import prisma from '../../clients/prisma'

export const name = 'guildCreate'

export const once = false

export async function execute(guild: Guild) {
    await prisma.servers.create({
        data: {
            id: guild.id,
        },
    })
    guild.channels.fetch().then((channels) => {
        sendEmbed(channels.filter(channelFilter).first())
    })
}

function channelFilter(channel: NonThreadGuildBasedChannel) {
    return (
        channel
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .permissionsFor(channel.guild.me!, false)
            .has(PermissionFlagsBits.SendMessages) &&
        channel.type == 'GUILD_TEXT'
    )
}

async function sendEmbed(channel: NonThreadGuildBasedChannel | undefined) {
    if (channel) {
        await (channel as TextChannel).send({
            embeds: [
                new embedBuilder().create(
                    'Thank you for inviting D-bot!',
                    "DON'T YOU LECTURE ME WITH YOUR 30 DOLLAR HAIRCUT"
                ),
            ],
        })
    }
}
