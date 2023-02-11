import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { Options } from '@mikro-orm/core'

const dbName = () => {
    if (process.env.DATABASE_URL) {
        const matches = /(?:.+:\/\/.+:.+@.+:[0-9]+\/)(.+)/.exec(
            process.env.DATABASE_URL
        )
        if (matches) {
            return matches[1]
        } else return 'undefined'
    } else return 'undefined'
}

const config: Options = {
    entities: ['./dist/types/database/'],
    baseDir: path.dirname(fileURLToPath(new URL('../', import.meta.url))),
    dbName: dbName(),
    type: 'postgresql',
    clientUrl: process.env.DATABASE_URL,
}

export default config