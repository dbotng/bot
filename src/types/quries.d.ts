declare namespace quries {
    type SettingsQuery = {
        settings: {
            cooldown: {
                time: number
                commands: string[]
            }
        }
    }
}
