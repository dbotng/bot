import userIcons from '@d-bot/types/newgrounds/objects/userIcons.js'

export default interface ngUser {
    icons: userIcons
    id: bigint
    name: string
    supporter: true
}
