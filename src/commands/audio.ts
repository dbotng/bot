import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

import * as play from './audio/play'
import * as radio from './audio/radio'
import * as pause from './audio/pause'
import * as skip from './audio/skip'
import * as stop from './audio/stop'
import * as leave from './audio/leave'
import * as volume from './audio/volume'
import * as repeat from './audio/repeat'
import * as playing from './audio/playing'
import * as queue from './audio/queue'

export const data = new SlashCommandBuilder()
    .setName('audio')
    .setDescription('Audio-portal related commands')
    .addSubcommand(play.data)
    .addSubcommand(radio.data)
    .addSubcommand(pause.data)
    .addSubcommand(skip.data)
    .addSubcommand(stop.data)
    .addSubcommand(leave.data)
    .addSubcommand(volume.data)
    .addSubcommand(repeat.data)
    .addSubcommand(playing.data)
    .addSubcommand(queue.data)

export async function execute(interaction: CommandInteraction) {
    switch (interaction.options.getSubcommand()) {
        case 'play': {
            await play.execute(interaction)
            break
        }
        case 'radio': {
            //await radio.execute(interaction)
            break
        }
        case 'pause': {
            await pause.execute(interaction)
            break
        }
        case 'skip': {
            await skip.execute(interaction)
            break
        }
        case 'stop': {
            await stop.execute(interaction)
            break
        }
        case 'leave': {
            await leave.execute(interaction)
            break
        }
        case 'volume': {
            await volume.execute(interaction)
            break
        }
        case 'repeat': {
            await repeat.execute(interaction)
            break
        }
        case 'playing': {
            await playing.execute(interaction)
            break
        }
        case 'queue': {
            await queue.execute(interaction)
            break
        }
    }
}
