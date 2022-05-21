/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-vars */
export type status = {
    contact: string
    location: string
    total_listeners: number
    server_id: string
    mounts: {
        [station: string]: {
            server_name: string
            server_description: string
            server_type: string
            stream_start: string
            bitrate: string
            listeners: string
            listener_peak: string
            genre: string
            mount: string
            server_url: string
            title: string
            current_song: string
        }
    }
}
export enum stations {
    'Easy Listening' = 'easylistening',
    'Electronic' = 'electronic',
    'Heavy metal' = 'heavymetal',
    'Hip Hop' = 'hiphop',
    'NG Mix' = 'ngmix',
    'Podcasts' = 'podcasts',
    'Rock' = 'rock',
}
