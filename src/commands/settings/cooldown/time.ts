import {
    SlashCommandNumberOption,
    SlashCommandSubcommandBuilder,
} from '@discordjs/builders'
import prisma from '../../../clients/prisma'
import { CommandInteraction } from 'discord.js'

import * as queries from '../../../types/queries'
import { Prisma } from '@prisma/client'
import commandSuccessEmbedBuilder from '../../../builders/commandSuccessEmbedBuilder'

export const data = new SlashCommandSubcommandBuilder()
    .setName('time')
    .setDescription('Change time')
    .addNumberOption(arg1)

function arg1(option: SlashCommandNumberOption) {
    return option
        .setName('time')
        .setDescription('Time when cooldown should elapse')
        .setRequired(true)
}

export async function execute(interaction: CommandInteraction) {
    const query = (
        await prisma.servers.findUnique({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            where: { id: interaction.guildId! },
            select: { settings: true },
        })
    )?.settings

    ;(query as queries.SettingsQuery).cooldown.time =
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        interaction.options.getNumber('time')!

    prisma.servers
        .update({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            where: { id: interaction.guildId! },
            data: { settings: query as Prisma.InputJsonValue },
        })
        .then(async () => {
            await interaction.reply({
                embeds: [
                    new commandSuccessEmbedBuilder().create(
                        'Settings has been changed'
                    ),
                ],
            })
        })
}
