import { SlashCommandSubcommandBuilder } from '@discordjs/builders'

export const data = new SlashCommandSubcommandBuilder()
    .setName('cooldown_time')
    .setDescription('Set cooldown elapse time')
