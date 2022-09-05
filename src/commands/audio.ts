import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

import * as play from '@d-bot/commands/audio/play.js'
import * as radio from '@d-bot/commands/audio/radio.js'
import * as pause from '@d-bot/commands/audio/pause.js'
import * as skip from '@d-bot/commands/audio/skip.js'
import * as stop from '@d-bot/commands/audio/stop.js'
import * as leave from '@d-bot/commands/audio/leave.js'
import * as volume from '@d-bot/commands/audio/volume.js'
import * as repeat from '@d-bot/commands/audio/repeat.js'
import * as playing from '@d-bot/commands/audio/playing.js'
import * as queue from '@d-bot/commands/audio/queue.js'

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
