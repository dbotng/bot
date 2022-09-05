import { Guild } from 'discord.js'
import prisma from '../../clients/prisma'

export const name = 'guildDelete'

export const once = false

export async function execute(guild: Guild) {
    await prisma.servers.delete({
        where: {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            id: BigInt(guild.id!),
        },
    })
}
