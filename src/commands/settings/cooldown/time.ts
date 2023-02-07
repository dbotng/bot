import prisma from '@tankbot/clients/prisma.js'
import {
    ChatInputCommandInteraction,
    SlashCommandNumberOption,
    SlashCommandSubcommandBuilder,
} from 'discord.js'

import { Prisma, servers } from '@prisma/client'
import commandSuccessEmbedBuilder from '@tankbot/builders/embeds/commandSuccessEmbedBuilder.js'

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

export async function execute(interaction: ChatInputCommandInteraction) {
    const query = (
        (await prisma.servers.findUnique({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            where: { id: BigInt(interaction.guildId!) },
            select: { settings: true },
        })) as servers
    )?.settings as Prisma.JsonObject

    ;((query.cooldown as Prisma.JsonObject).time as number) =
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        interaction.options.getNumber('time')!

    prisma.servers
        .update({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            where: { id: BigInt(interaction.guildId!) },
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
