import { ChatInputCommandInteraction, GuildMember } from 'discord.js'
import humanizeDuration from 'humanize-duration'
import embedBuilder from '@d-bot/builders/embeds/embedBuilder.js'

const cooldown = global.cooldown

const shouldElapse = 10000

import prisma from '@d-bot/clients/prisma.js'
import { Prisma, servers } from '@prisma/client'

async function whitelist(interaction: ChatInputCommandInteraction) {
    //TODO: Database default/custom options
    const query = (
        (
            (
                (await prisma.servers.findUnique({
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    where: { id: BigInt(interaction.guildId!) },
                    select: { settings: true },
                })) as servers
            )?.settings as Prisma.JsonObject
        )?.cooldown as Prisma.JsonObject
    ).commands as string[]
    if (
        query.includes(
            `${interaction.commandName}_${interaction.options.getSubcommand()}`
        ) ||
        query.includes(
            `${
                interaction.commandName
            }_${interaction.options.getSubcommandGroup(
                false
            )}_${interaction.options.getSubcommand()}`
        )
    )
        return true
    else return false
}

function formatId(interaction: ChatInputCommandInteraction) {
    return `${interaction.guildId}_${interaction.channelId}_${
        (interaction.member as GuildMember).id
    }_${interaction.commandName}_${interaction.options.getSubcommand()}`
}

export async function check(interaction: ChatInputCommandInteraction) {
    const cooldownId = formatId(interaction)

    if ((await whitelist(interaction)) && cooldown.has(cooldownId)) {
        await interaction.reply({
            embeds: [
                new embedBuilder().create(
                    'Cooldown is active!',
                    `Please wait for ${humanizeDuration(
                        cooldown.get(cooldownId) - Date.now()
                    )} before trying.`
                ),
            ],
        })
        return true
    }
    return false
}

export async function create(interaction: ChatInputCommandInteraction) {
    const cooldownId = formatId(interaction)

    if (await whitelist(interaction)) {
        cooldown.set(cooldownId, Date.now() + shouldElapse)
        setTimeout(() => {
            cooldown.delete(cooldownId)
        }, shouldElapse)
    }
}
