import { DisTube } from 'distube'
import * as discordjs from '@d-bot/clients/discordjs.js'
import fs from 'fs'
import { YtDlpPlugin } from '@distube/yt-dlp'

export const client = new DisTube(discordjs.client, {
    youtubeDL: false,
    plugins: [new YtDlpPlugin()],
})

export async function init() {
    const eventFiles = fs
        .readdirSync(`${__dirname}/../events/distube`)
        .filter((file) => file.endsWith('.js'))

    for (const file of eventFiles) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const event = await import(`${__dirname}/../events/distube/${file}`)
        /* eslint-disable @typescript-eslint/no-explicit-any */
        if (event.once) {
            client.once(event.name, (...args: any) => event.execute(...args))
        } else {
            client.on(event.name, (...args: any) => event.execute(...args))
        }
        /* eslint-enable */
    }
}
