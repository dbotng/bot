export default function getEnumKeyByEnumValue<
    T extends { [index: string]: string }
>(Enum: T, enumValue: string): keyof T | null {
    const keys = Object.keys(Enum).filter((x) => Enum[x] == enumValue)
    return keys.length > 0 ? keys[0] : null
}
