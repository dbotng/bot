import { CommandInteraction, GuildMember } from 'discord.js'
import humanizeDuration from 'humanize-duration'
import embedBuilder from '../builders/embeds/embedBuilder'

const cooldown = global.cooldown

const shouldElapse = 10000

import prisma from '../clients/prisma'
import * as queries from '../types/prismaQueries'

async function whitelist(interaction: CommandInteraction) {
    //TODO: Database default/custom options
    const query = (
        (
            await prisma.servers.findUnique({
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                where: { id: BigInt(interaction.guildId!) },
                select: { settings: true },
            })
        )?.settings as queries.SettingsQuery
    ).cooldown.commands
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

function formatId(interaction: CommandInteraction) {
    return `${interaction.guildId}_${interaction.channelId}_${
        (interaction.member as GuildMember).id
    }_${interaction.commandName}_${interaction.options.getSubcommand()}`
}

export async function check(interaction: CommandInteraction) {
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

export async function create(interaction: CommandInteraction) {
    const cooldownId = formatId(interaction)

    if (await whitelist(interaction)) {
        cooldown.set(cooldownId, Date.now() + shouldElapse)
        setTimeout(() => {
            cooldown.delete(cooldownId)
        }, shouldElapse)
    }
}
