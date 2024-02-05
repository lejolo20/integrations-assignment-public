import { Request, Response } from "express"
import { RevoTable } from "../models/revo/tables"

export const postTablesController = (req: Request, res: Response) => {
    try {
        if (!isValidRevoTable(req.body)) {
            res.status(400).send("Invalid data")
            return
        }

        const table: RevoTable = req.body

        res.status(200).json(table)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

function isValidRevoTable(table: any): table is RevoTable {
    return (
        typeof table.id &&
        typeof table.x &&
        typeof table.y &&
        typeof table.width &&
        typeof table.height &&
        typeof table.baseX &&
        typeof table.baseY &&
        typeof table.isJoined &&
        typeof table.joined_with_id &&
        typeof table.baseWidth &&
        typeof table.baseHeight &&
        typeof table.type_id &&
        typeof table.room_id &&
        typeof table.price_id === "number" &&
        typeof table.name &&
        typeof table.color === "string"
    )
}
