import { CommandInteraction } from 'discord.js'
import humanizeDuration from 'humanize-duration'
import embedBuilder from '../builders/embedBuilder'

const cooldown = global.cooldown

const shouldElapse = 10000

function whitelist(command: string, subcommand: string) {
    switch (`${command}_${subcommand}`) {
        case 'fun_testembed':
            return true
        default:
            return false
    }
}

export async function check(interaction: CommandInteraction) {
    if (
        whitelist(
            interaction.commandName,
            interaction.options.getSubcommand()
        ) == false
    ) {
        return
    }

    const cooldownId = `${interaction.guildId}_${interaction.channelId}_${
        interaction.user.id
    }_${interaction.commandName}_${interaction.options.getSubcommand()}`

    if (cooldown.has(cooldownId)) {
        await interaction.reply({
            embeds: [
                new embedBuilder(
                    'Cooldown is active!',
                    `Please wait for ${humanizeDuration(
                        global.cooldown.get(cooldownId) - Date.now()
                    )} before trying.`
                ).create(),
            ],
        })
    }
}

export async function create(interaction: CommandInteraction) {
    if (
        whitelist(
            interaction.commandName,
            interaction.options.getSubcommand()
        ) == false
    ) {
        return
    }

    const cooldownId = `${interaction.guildId}_${interaction.channelId}_${
        interaction.user.id
    }_${interaction.commandName}_${interaction.options.getSubcommand()}`

    cooldown.set(cooldownId, Date.now() + shouldElapse)
    setTimeout(() => {
        cooldown.delete(cooldownId)
    }, shouldElapse)
}
