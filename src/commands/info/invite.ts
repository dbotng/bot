import { SlashCommandSubcommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import embedBuilder from '../../builders/embeds/embedBuilder'

export const data = new SlashCommandSubcommandBuilder()
    .setName('invite')
    .setDescription('Invitation instructions')

export async function execute(interaction: CommandInteraction) {
    await interaction.reply({
        embeds: [
            new embedBuilder()
                .create(
                    'How to invite the bot',
                    'Here is a gif showing how to invite the bot easily'
                )
                .addField(
                    "And here's a link to invite to share with others",
                    'https://discord.com/api/oauth2/authorize?client_id=909375750753361980&permissions=405916992&scope=bot%20applications.commands'
                ),
        ],
        files: [`${__dirname}/../../../public/assets/invite.gif`],
    })
}
