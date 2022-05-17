import { SlashCommandSubcommandBuilder } from '@discordjs/builders'

export const data = new SlashCommandSubcommandBuilder()
    .setName('cooldownCommands')
    .setDescription(
        'Add or remove commands in cooldown in this format: category_command'
    )
