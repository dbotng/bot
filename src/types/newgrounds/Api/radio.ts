export type response = {
    status: string
    data: {
        artist: string
        audio_id: bigint
        genre: string
        listen_url: string
        live: boolean
        on_air_at: bigint
        replay_gain: string
        listeners: bigint
        is_live: boolean //fallback
        title: string
        uptime: bigint
        totalListeners: string //fallback
    }
}
