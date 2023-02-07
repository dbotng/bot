import imageThumb from '@tankbot/types/newgrounds/objects/imageThumb.js'

export type response = {
    id: bigint,
    title: string,
    url: string,
    download_url: string,
    stream_url: string,
    filesize: string,
    icons: imageThumb,
    authors: authors[],
    has_scouts: boolean,
    unpublished: boolean,
    allow_downloads: boolean,
    has_valid_portal_member: boolean,
    allow_external_api: boolean
}

type authors = {
    id: bigint,
    name: string,
    url: string,
    icons: imageThumb,
    owner: boolean,
    manager: boolean,
    is_scout: boolean
}
