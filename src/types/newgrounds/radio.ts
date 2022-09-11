export type response = {
    status: string
    data: {
        artist: string
        audio_id: bigint
        listen_url: string
        on_air_at: bigint
        replay_gain: string
        listeners: bigint
        live: boolean
        is_live: boolean //fallback
        title: string
        totalListeners: string //fallback
        uptime: bigint
    }
}
