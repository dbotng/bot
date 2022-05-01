import DisTube from 'distube'
import * as discordjs from './discordjs'
import fs from 'fs'
import { Client } from 'discord.js'

export const distube = new DisTube(discordjs.client)

export function init(client: Client) {
    const eventFiles = fs
        .readdirSync(`${__dirname}/../events/distube`)
        .filter((file) => file.endsWith('.js'))

    for (const file of eventFiles) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const event = require(`${__dirname}/../events/distube/${file}`)
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args))
        } else {
            client.on(event.name, (...args) => event.execute(...args))
        }
    }
}
