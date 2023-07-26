export interface FoodlusZoneModel {
    name: string
    serviceLocations: FoodlusTableModel[]
}

export interface FoodlusTableModel {
    name: string
    code: number
    zoneId: number | string
    zoneName: string
}
