import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
} from 'discord.js'
import humanizeDuration from 'humanize-duration'
import embedBuilder from '@tankbot/builders/embeds/embedBuilder.js'
import 'dotenv/config'
import {version} from '@tankbot/package.json'

export const data = new SlashCommandSubcommandBuilder()
    .setName('bot')
    .setDescription('General bot information')

export async function execute(interaction: ChatInputCommandInteraction) {
    const embed = new embedBuilder()
        .create(
            'Bot information',
            'Here are the basic information about TankBot, and other related stuff.'
        )
        .addFields(
            {
                name: 'Bot Stats',
                value: `Joined in ${
                    (await interaction.client.guilds.fetch()).size
                } servers, used by ${interaction.client.guilds.cache
                    .map((guild) => guild.memberCount)
                    .reduce(
                        (acc, guild) => acc + guild
                    )} users and probably growing.\nBot is up for ${humanizeDuration(
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    interaction.client.uptime!
                )}. \nRunning version ${version}`,
            },
            {
                name: 'Creator info and links',
                value: 'Created by Bread#0012\n[Github repo](https://github.com/ngtankbot/bot)',
            }
        )
    await interaction.reply({ embeds: [embed] })
}
