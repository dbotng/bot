import { PermissionFlagsBits } from 'discord-api-types/v10'
import { Guild } from 'discord.js'
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
        channels
            .filter((channel) =>
                channel
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    .permissionsFor(guild.me!, false)
                    .has(PermissionFlagsBits.SendMessages)
            )
            .every((channel) => {
                if (channel.isText()) {
                    channel.send({
                        embeds: [
                            new embedBuilder().create(
                                'Thank you for inviting D-bot!',
                                "DON'T YOU LECTURE ME WITH YOUR 30 DOLLAR HAIRCUT"
                            ),
                        ],
                    })
                    return false
                }
                return true
            })
    })
}
