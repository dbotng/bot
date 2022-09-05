import { Client, Collection, GatewayIntentBits } from 'discord.js'
import fs from 'fs'

export const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
})

export async function init() {
    client.commands = new Collection()

    const commandFiles = fs
        .readdirSync(`${__dirname}/../commands`)
        .filter((file) => file.endsWith('.js'))

    for (const file of commandFiles) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const command = await import(`${__dirname}/../commands/${file}`)
        client.commands.set(command.data.name, command)
    }

    const eventFiles = fs
        .readdirSync(`${__dirname}/../events/discordjs`)
        .filter((file) => file.endsWith('.js'))

    for (const file of eventFiles) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const event = await import(`${__dirname}/../events/discordjs/${file}`)
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args))
        } else {
            client.on(event.name, (...args) => event.execute(...args))
        }
    }
}
