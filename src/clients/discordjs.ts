import { Client, Collection, Intents } from 'discord.js'
import fs from 'fs'

export const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
})

export function init() {
    client.commands = new Collection()

    const commandFiles = fs
        .readdirSync(`${__dirname}/../commands`)
        .filter((file) => file.endsWith('.js'))

    for (const file of commandFiles) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const command = require(`${__dirname}/../commands/${file}`)
        client.commands.set(command.data.name, command)
    }

    const eventFiles = fs
        .readdirSync(`${__dirname}/../events/discordjs`)
        .filter((file) => file.endsWith('.js'))

    for (const file of eventFiles) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const event = require(`${__dirname}/../events/discordjs/${file}`)
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args))
        } else {
            client.on(event.name, (...args) => event.execute(...args))
        }
    }
}
