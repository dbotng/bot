export const name = 'shardError'

export const once = false

export function execute(error: Error) {
    console.error('[discord.js] Websocket error:', error)
}
