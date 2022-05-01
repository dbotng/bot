import * as discordjs from './clients/discordjs'
import * as distube from './clients/distube'
import 'dotenv/config'

global.cooldown = new Map()

discordjs.init()
discordjs.client.login(process.env.token)

distube.init(discordjs.client)
