/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import user from './objects/user'

export interface response {
    success: boolean
    app_id: string
    result: {
        echo: string
        compponent: string
        data: {
            success: boolean
            session: sessionData
            debug: true
        }
    }
    debug: {
        exec_time: number
        input: JSON
    }
}

interface sessionData {
    expired: boolean
    id: string
    passport_url: string
    remember: boolean
    user: user | null
}
