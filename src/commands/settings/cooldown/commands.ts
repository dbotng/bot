import {
    SlashCommandStringOption,
    SlashCommandSubcommandBuilder,
} from '@discordjs/builders'
import { Prisma } from '@prisma/client'
import { CommandInteraction } from 'discord.js'
import commandSuccessEmbedBuilder from '../../../builders/commandSuccessEmbedBuilder'
import userErrorEmbedBuilder from '../../../builders/userErrorEmbedBuilder'
import prisma from '../../../clients/prisma'

import * as queries from '../../../types/queries'

export const data = new SlashCommandSubcommandBuilder()
    .setName('commands')
    .setDescription('Add or remove commands')
    .addStringOption(arg1)

function arg1(option: SlashCommandStringOption) {
    return option
        .setName('command')
        .setDescription('Format should be {category}_{command}')
        .setRequired(true)
}

export async function execute(interaction: CommandInteraction) {
    const arg1 = interaction.options.getString('command')
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    if (
        !/[a-z]+_[a-z]+[_]?[a-z]+/g.test(arg1!) ||
        /[a-z]+_[a-z]+_[a-z]+_[_a-z]*/g.test(arg1!)
    ) {
        await interaction.reply({
            embeds: [
                new userErrorEmbedBuilder().create(
                    'Input command not in format, check errors and try again.'
                ),
            ],
        })
        return
    }
    /* eslint-enable */

    const query = (
        await prisma.servers.findUnique({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            where: { id: interaction.guildId! },
            select: { settings: true },
        })
    )?.settings

    const commands = (query as queries.SettingsQuery).cooldown.commands

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    if (commands.includes(arg1!)) {
        ;(query as queries.SettingsQuery).cooldown.commands = commands.filter(
            (item) => item !== arg1!
        )
    } else {
        ;(query as queries.SettingsQuery).cooldown.commands.push(arg1!)
    }
    /* eslint-enable */

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
