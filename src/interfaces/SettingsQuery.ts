interface SettingsQuery {
    settings: {
        cooldown: {
            time: number
            commands: string[]
        }
    }
}

export default SettingsQuery
