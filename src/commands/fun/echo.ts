import { CommandInteraction } from 'discord.js'

export async function execute(interaction: CommandInteraction): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await interaction.reply(interaction.options.getString('content')!)
}
