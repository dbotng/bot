import { ActivityOptions, ActivityType, Client } from 'discord.js'

export const name = 'ready'

export const once = true

export function execute(client: Client) {
    console.log('[discord.js] Success')
    const activityTexts: ActivityOptions[] = [
        {
            name: `with version ${JSON.parse(packageJSON).version}`,
            type: ActivityType.Playing,
        },
        { name: 'which content to blam or save', type: ActivityType.Watching },
        { name: 'Newgrounds radio', type: ActivityType.Listening },
        { name: 'game medals', type: ActivityType.Competing },
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
