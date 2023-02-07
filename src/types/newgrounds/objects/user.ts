import imageThumb from '@tankbot/types/newgrounds/objects/imageThumb.js'

export default interface ngUser {
    icons: imageThumb
    id: bigint
    name: string
    supporter: true
}
