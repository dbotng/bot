import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

import * as play from './audio/play'
//import * as radio from './audio/radio'
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
    .addSubcommand((command) =>
        command
            .setName('play')
            .setDescription('Play audio from Newgrounds')
            .addStringOption((option) =>
                option.setName('link').setDescription('Newgrounds audio link')
            )
    )
    .addSubcommand((command) =>
        command.setName('radio').setDescription('Play from Newgrounds radio')
    )
    .addSubcommand((command) =>
        command.setName('pause').setDescription('Pause the audio')
    )
    .addSubcommand((command) =>
        command
            .setName('skip')
            .setDescription('Skip to the next song in the queue')
    )
    .addSubcommand((command) =>
        command
            .setName('stop')
            .setDescription('Stop the audio and deletes the queue')
    )
    .addSubcommand((command) =>
        command
            .setName('leave')
            .setDescription(
                'Stop the audio, deletes the queue and leave the channel'
            )
    )
    .addSubcommand((command) =>
        command
            .setName('volume')
            .setDescription('Set volume')
            .addNumberOption((option) =>
                option
                    .setName('percent')
                    .setDescription('The volume percentage')
                    .setRequired(true)
            )
    )
    .addSubcommand((command) =>
        command
            .setName('repeat')
            .setDescription('Set repeat mode')
            .addStringOption((option) =>
                option.setName('mode').setDescription('Mode to repeat')
            )
    )
    .addSubcommand((command) =>
        command.setName('playing').setDescription("See what's playing")
    )
    .addSubcommand((command) =>
        command.setName('queue').setDescription("See what's next on the queue")
    )

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
