import * as discordjs from '@tankbot/clients/discordjs.js'
import * as distube from '@tankbot/clients/distube.js'
import 'dotenv/config'
import SegfaultHandler from 'segfault-handler'
import fs from 'node:fs'

global.cooldown = new Map()
global.musicQueues = new Map()
global.packageJSON = fs.readFileSync(
    new URL('../package.json', import.meta.url),
    'utf8'
)

await discordjs.init()
discordjs.client.login(process.env.token)

distube.init()

SegfaultHandler.registerHandler()

process.on('unhandledRejection', (error) => {
    console.error('[discord.js]', error)
})
