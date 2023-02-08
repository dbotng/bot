import baseUser from '@tankbot/types/newgrounds/types/baseUser.js'

export type response = {
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

type sessionData = {
    expired: boolean
    id: string
    passport_url: string
    remember: boolean
    user: user | null
}

type user = baseUser & {
    supporter: boolean
}
