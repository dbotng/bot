import * as discordjs from './clients/discordjs'
import 'dotenv/config'

global.cooldown = new Map()

discordjs.init()
discordjs.client.login(process.env.token)
