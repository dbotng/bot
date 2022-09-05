/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
export type SettingsQuery = {
    cooldown: {
        time: number
        commands: string[]
    }
}

export type DiscordUserQuery = {
    id: bigint
    username: string
    discriminator: string
    newgroundsUser: NewgroundsUserQuery | undefined
}

export type NewgroundsUserQuery = {
    id: bigint
    name: string
    supporter: boolean
    icons: {
        small: string
        large: string
        medium: string
    }
    discordUser: NewgroundsUserQuery | undefined
}
