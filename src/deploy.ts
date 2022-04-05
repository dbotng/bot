import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'
import 'dotenv/config'
import fs from 'fs'

const commands: string[] = []
const commandFiles = fs
    .readdirSync(`${__dirname}/commands`)
    .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`${__dirname}/commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(process.env.token!)

rest.put(
    Routes.applicationGuildCommands(
        process.env.clientId!,
        process.env.guildId!
    ),
    { body: [] }
)
    .then(() => console.log('[deploy.ts] Successfully cleared commands'))
    .catch(console.error)

rest.put(
    Routes.applicationGuildCommands(
        process.env.clientId!,
        process.env.guildId!
    ),
    { body: commands }
)
    .then(() => console.log('[deploy.ts] Successfully deployed commands'))
    .catch(console.error)
