import * as discordjs from './clients/discordjs'
import * as distube from './clients/distube'
import 'dotenv/config'

global.cooldown = new Map()
global.musicQueues = new Map()

discordjs.init()
discordjs.client.login(process.env.token)

distube.init()

process.on('unhandledRejection', (error) => {
    console.error('[discord.js] Unhandled promise rejection:', error)
})
