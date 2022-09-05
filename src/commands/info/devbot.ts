import { ChatInputCommandInteraction, SlashCommandSubcommandBuilder } from 'discord.js'
import embedBuilder from '@d-bot/builders/embeds/embedBuilder.js'

export const data = new SlashCommandSubcommandBuilder()
    .setName('devbot')
    .setDescription(
        'Excited about the bot? Learn more to try out latest revision of the bot'
    )

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply({
        embeds: [
            new embedBuilder().create(
                'D-bot dev',
                'Do you like testing for new features? If so click on the [link](https://discord.gg/nSdQyfZd3s) to try out new stuff!'
            ),
        ],
    })
}
