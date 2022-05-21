import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'
import 'dotenv/config'
import fs from 'fs'

const commands: string[] = []
const commandFiles = fs
    .readdirSync(`${__dirname}/commands`)
    .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command = require(`${__dirname}/commands/${file}`)
    commands.push(command.data.toJSON())
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rest = new REST({ version: '9' }).setToken(process.env.token!)

if (process.env.environment == 'dev') {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    rest.put(
        Routes.applicationGuildCommands(
            process.env.clientId!,
            process.env.guildId!
        ),
        { body: [] }
    )
        .then(() =>
            console.log('[deploy.ts] Successfully cleared local commands')
        )
        .catch(console.error)
        .finally(() => {
            rest.put(
                Routes.applicationGuildCommands(
                    process.env.clientId!,
                    process.env.guildId!
                ),
                { body: commands }
            )
                .then(() =>
                    console.log(
                        '[deploy.ts] Successfully deployed local commands'
                    )
                )
                .catch(console.error)
        })
    /* eslint-enable */
} else {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    rest.put(
        Routes.applicationGuildCommands(
            process.env.clientId!,
            process.env.guildId!
        ),
        { body: [] }
    )
        .then(() =>
            console.log('[deploy.ts] Successfully cleared global commands')
        )
        .catch(console.error)
        .finally(() => {
            rest.put(
                Routes.applicationGuildCommands(
                    process.env.clientId!,
                    process.env.guildId!
                ),
                { body: commands }
            )
                .then(() =>
                    console.log(
                        '[deploy.ts] Successfully deployed global commands'
                    )
                )
                .catch(console.error)
        })
    /* eslint-enable */
}
