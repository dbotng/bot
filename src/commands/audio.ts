import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

import * as play from '@tankbot/commands/audio/play.js'
import * as radio from '@tankbot/commands/audio/radio.js'
import * as pause from '@tankbot/commands/audio/pause.js'
import * as skip from '@tankbot/commands/audio/skip.js'
import * as stop from '@tankbot/commands/audio/stop.js'
import * as leave from '@tankbot/commands/audio/leave.js'
import * as volume from '@tankbot/commands/audio/volume.js'
import * as repeat from '@tankbot/commands/audio/repeat.js'
import * as playing from '@tankbot/commands/audio/playing.js'
import * as queue from '@tankbot/commands/audio/queue.js'

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

export async function execute(interaction: ChatInputCommandInteraction) {
    switch (interaction.options.getSubcommand()) {
        case 'play': {
            await play.execute(interaction)
            break
        }
        case 'radio': {
            await radio.execute(interaction)
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
