import * as discordjs from '@d-bot/clients/discordjs.js'
import * as distube from '@d-bot/clients/distube.js'
import 'dotenv/config'
import SegfaultHandler from 'segfault-handler'

global.cooldown = new Map()
global.musicQueues = new Map()

await discordjs.init()
discordjs.client.login(process.env.token)

distube.init()

SegfaultHandler.registerHandler()

process.on('unhandledRejection', (error) => {
    console.error('[discord.js]', error)
})
