import { Client, Collection, Intents } from 'discord.js'
import 'dotenv/config'
import fs from 'fs'

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
})

client.once('ready', () => {
    console.log('[discord.js] Success')
})

client.commands = new Collection()
const commandFiles = fs
    .readdirSync(`${__dirname}/commands`)
    .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`${__dirname}/commands/${file}`)
    client.commands.set(command.data.name, command)
}

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)

    if (!command) return

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true,
        })
    }
})

client.login(process.env.token)
