import * as discordjs from './clients/discordjs'
import * as distube from './clients/distube'
import 'dotenv/config'
import SegfaultHandler from 'segfault-handler'

global.cooldown = new Map()
global.musicQueues = new Map()

discordjs.init()
discordjs.client.login(process.env.token)

distube.init()

SegfaultHandler.registerHandler()

process.on('unhandledRejection', (error) => {
    console.error('[discord.js]', error)
})
