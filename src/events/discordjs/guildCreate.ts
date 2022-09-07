import { ChannelType, PermissionFlagsBits } from 'discord-api-types/v10'
import { Guild, NonThreadGuildBasedChannel, TextChannel } from 'discord.js'
import embedBuilder from '@d-bot/builders/embeds/embedBuilder.js'
import prisma from '@d-bot/clients/prisma.js'

export const name = 'guildCreate'

export const once = false

export async function execute(guild: Guild) {
    await prisma.servers.create({
        data: {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            id: BigInt(guild.id!),
        },
    })
    guild.channels.fetch().then((channels) => {
        sendEmbed(channels.filter(channelFilter).first())
    })
}

function channelFilter(channel: NonThreadGuildBasedChannel) {
    return (
        channel
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .permissionsFor(channel.guild.members.me!, false)
            .has(PermissionFlagsBits.SendMessages) &&
        channel.type == ChannelType.GuildText
    )
}

async function sendEmbed(channel: NonThreadGuildBasedChannel | undefined) {
    if (channel) {
        await (channel as TextChannel).send({
            embeds: [
                new embedBuilder()
                    .create(
                        'Thank you for inviting D-bot!',
                        'You can check out the commands by typing / in the textbox and mess around with the bot!'
                    )
                    .addFields({
                        name: 'Any questions?',
                        value: 'You can always join the [Discord server](https://discord.gg/nSdQyfZd3s) where you can ask questions (and chat with other people) and also the [Github repo](https://github.com/Featyre/D-Bot) for submitting an issue!',
                    }),
            ],
        })
    }
}
