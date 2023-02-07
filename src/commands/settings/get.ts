import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
} from 'discord.js'
import embedBuilder from '@tankbot/builders/embeds/embedBuilder.js'
import prisma from '@tankbot/clients/prisma.js'
import { Prisma, servers } from '@prisma/client'

export const data = new SlashCommandSubcommandBuilder()
    .setName('get')
    .setDescription('Get all settings')

export async function execute(
    interaction: ChatInputCommandInteraction
): Promise<void> {
    const query = await prisma.servers.findUnique({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        where: { id: BigInt(interaction.guildId!) },
        select: { settings: true },
    })

    await interaction.reply({
        embeds: [
            new embedBuilder()
                .create('Settings', 'Here are your settings')
                .addFields({
                    name: 'Cooldown',
                    value: `Time: ${
                        (
                            ((query as servers)?.settings as Prisma.JsonObject)
                                ?.cooldown as Prisma.JsonObject
                        )?.time as number
                    }\nEnabled commands: ${
                        (
                            ((query as servers)?.settings as Prisma.JsonObject)
                                ?.cooldown as Prisma.JsonObject
                        )?.commands as string[]
                    }`,
                }),
        ],
    })
}
