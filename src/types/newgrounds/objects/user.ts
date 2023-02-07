import userIcons from '@tankbot/types/newgrounds/objects/userIcons.js'

export default interface ngUser {
    icons: userIcons
    id: bigint
    name: string
    supporter: true
}
