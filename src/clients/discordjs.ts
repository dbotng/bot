import { Client, Collection, GatewayIntentBits } from 'discord.js'
import fs from 'fs'
import { fileURLToPath } from 'url'

export const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
})

export async function init() {
    client.commands = new Collection()

    const commandFiles = fs
        .readdirSync(fileURLToPath(new URL(`./../commands`, import.meta.url)))
        .filter((file) => file.endsWith('.js'))

    for (const file of commandFiles) {
        const command = await import(
            new URL(`./../commands/${file}`, import.meta.url).toString()
        )
        client.commands.set(command.data.name, command)
    }

    const eventFiles = fs
        .readdirSync(
            fileURLToPath(new URL(`./../events/discordjs`, import.meta.url))
        )
        .filter((file) => file.endsWith('.js'))

    for (const file of eventFiles) {
        const event = await import(
            new URL(`./../events/discordjs/${file}`, import.meta.url).toString()
        )
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args))
        } else {
            client.on(event.name, (...args) => event.execute(...args))
        }
    }
}
