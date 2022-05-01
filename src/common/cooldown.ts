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

export function check(
    guildId: string,
    channelId: string,
    memberId: string,
    command: string,
    subcommand: string
) {
    if (whitelist(command, subcommand) == false) {
        return false
    }

    if (
        cooldown.has(
            `${guildId}_${channelId}_${memberId}_${command}_${subcommand}`
        )
    ) {
        return true
    } else {
        return false
    }
}

export async function create(
    guildId: string,
    channelId: string,
    memberId: string,
    command: string,
    subcommand: string
) {
    if (whitelist(command, subcommand) == false) {
        return
    }

    const cooldownId = `${guildId}_${channelId}_${memberId}_${command}_${subcommand}`

    cooldown.set(cooldownId, Date.now() + shouldElapse)
    setTimeout(() => {
        cooldown.delete(cooldownId)
    }, shouldElapse)
}
