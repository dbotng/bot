import { CommandInteraction, GuildMember } from 'discord.js'
import humanizeDuration from 'humanize-duration'
import embedBuilder from '../builders/embedBuilder'

const cooldown = global.cooldown

const shouldElapse = 10000

function whitelist(command: string, subcommand: string) {
    //TODO: Database default/custom options
    switch (`${command}_${subcommand}`) {
        case 'info_typescript':
            return true
        default:
            return false
    }
}

function formatId(interaction: CommandInteraction) {
    return `${interaction.guildId}_${interaction.channelId}_${
        (interaction.member as GuildMember).id
    }_${interaction.commandName}_${interaction.options.getSubcommand()}`
}

export async function check(interaction: CommandInteraction) {
    const cooldownId = formatId(interaction)

    if (
        whitelist(
            interaction.commandName,
            interaction.options.getSubcommand()
        ) &&
        cooldown.has(cooldownId)
    ) {
        await interaction.reply({
            embeds: [
                new embedBuilder().create(
                    'Cooldown is active!',
                    `Please wait for ${humanizeDuration(
                        cooldown.get(cooldownId) - Date.now()
                    )} before trying.`
                ),
            ],
        })
        return true
    }
    return false
}

export function create(interaction: CommandInteraction) {
    const cooldownId = formatId(interaction)

    if (
        whitelist(interaction.commandName, interaction.options.getSubcommand())
    ) {
        cooldown.set(cooldownId, Date.now() + shouldElapse)
        setTimeout(() => {
            cooldown.delete(cooldownId)
        }, shouldElapse)
    }
}
