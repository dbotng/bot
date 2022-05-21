import { Guild } from 'discord.js'
import prisma from '../../clients/prisma'

export const name = 'guildDelete'

export const once = false

export async function execute(guild: Guild) {
    await prisma.servers.delete({
        where: {
            id: guild.id,
        },
    })
}
