export interface RevoTable {
    id: number
    name: string
    x: number
    y: number
    width: number
    height: number
    baseX: number
    baseY: number
    isJoined: number
    joined_with_id: null | number
    baseWidth: number
    baseHeight: number
    color: string
    type_id: number
    room_id: number
    price_id: number
}

export interface RevoZone {
    name: string
    tables: RevoTable[]
}
