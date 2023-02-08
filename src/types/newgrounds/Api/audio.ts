import imageThumbs from '@tankbot/types/newgrounds/types/imageThumbs.js'
import baseUser from '@tankbot/types/newgrounds/types/baseUser.js'

export type response = {
    id: bigint,
    title: string,
    url: string,
    download_url: string,
    stream_url: string,
    filesize: string,
    icons: imageThumbs,
    authors: authors[],
    has_scouts: boolean,
    unpublished: boolean,
    allow_downloads: boolean,
    has_valid_portal_member: boolean,
    allow_external_api: boolean
}

type authors = baseUser & {
    url: string,
    owner: boolean,
    manager: boolean,
    is_scout: boolean
}
