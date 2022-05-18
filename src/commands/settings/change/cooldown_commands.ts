import { SlashCommandSubcommandBuilder } from '@discordjs/builders'

export const data = new SlashCommandSubcommandBuilder()
    .setName('cooldown_commands')
    .setDescription(
        'Add or remove commands in cooldown in this format: category_command'
    )
