import { ActivityOptions, Client } from 'discord.js'
import 'dotenv/config'

export const name = 'ready'

export const once = true

export function execute(client: Client) {
    console.log('[discord.js] Success')
    const activityTexts: ActivityOptions[] = [
        { name: `with ${process.env.version}`, type: 'PLAYING' },
        { name: 'which content to blam or save', type: 'WATCHING' },
        { name: 'Newgrounds radio', type: 'LISTENING' },
        { name: 'game medals', type: 'COMPETING' },
    ]

    setInterval(
        () =>
            client?.user?.setActivity(
                activityTexts[
                    Math.floor(Math.random() * (activityTexts.length - 1) + 1)
                ]
            ),
        10000
    )
}
