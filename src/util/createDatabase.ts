import prisma from '@tankbot/clients/prisma.js'
import { ChatInputCommandInteraction, Guild } from 'discord.js'

export async function interactionPreCreate (interaction: ChatInputCommandInteraction) {
    const server = await prisma.servers.findUnique({
        where: {
            id: interaction.guild?.id ? BigInt(interaction.guild?.id) : undefined
        }
    })
    if (!server && interaction.guild) {
        databaseCreate(interaction.guild)
    }
    if (server) {
        return true
    }
    return false
}

export async function databaseCreate (guild: Guild) {
    await prisma.servers.create({
        data: {
            id: BigInt(guild.id),
        },
    })
}
