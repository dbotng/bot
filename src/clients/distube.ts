import { DisTube } from 'distube'
import * as discordjs from '@d-bot/clients/discordjs.js'
import fs from 'fs'
import { YtDlpPlugin } from '@distube/yt-dlp'
import { fileURLToPath } from 'url'

export const client = new DisTube(discordjs.client, {
    plugins: [new YtDlpPlugin({ update: true })],
})

export async function init() {
    const eventFiles = fs
        .readdirSync(
            fileURLToPath(new URL(`./../events/distube`, import.meta.url))
        )
        .filter((file) => file.endsWith('.js'))

    for (const file of eventFiles) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const event = await import(
            new URL(`./../events/distube/${file}`, import.meta.url).toString()
        )
        /* eslint-disable @typescript-eslint/no-explicit-any */
        if (event.once) {
            client.once(event.name, (...args: any) => event.execute(...args))
        } else {
            client.on(event.name, (...args: any) => event.execute(...args))
        }
        /* eslint-enable */
    }
}
