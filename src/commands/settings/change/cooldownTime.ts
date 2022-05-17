import { SlashCommandSubcommandBuilder } from '@discordjs/builders'

export const data = new SlashCommandSubcommandBuilder()
    .setName('cooldownTime')
    .setDescription(
        'Set cooldown elapse time'
    )
