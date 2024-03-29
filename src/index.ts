import express, { Request, Response } from "express"
import https from "https"
import dotenv from "dotenv"
import { FoodlusZoneModel } from "./models/tables"
import getTables from "./routes/getTables"
import login from "./routes/login"

const app = express()

app.use(express.json())

dotenv.config()

app.get("/", (_req: Request, res: Response) => {
    res.send("Hello World!")
})
app.use("/api/external/v2/auth", getTables)

app.use("/api/external/v2", login)

const headers = {
    tenant: process.env.REVO_TENANT as string,
    Authorization: `Bearer ${process.env.REVO_TOKEN as string}`,
    "client-token": process.env.REVO_CLIENT_TOKEN as string
}

export const options = {
    hostname: process.env.REVO_URL as string,
    port: 443,
    path: "/api/external/v2/rooms?withTables",
    method: "GET",
    headers: headers
}

export const getRevoTables = (): Promise<FoodlusZoneModel[]> => {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = ""
            res.on("data", (chunk) => {
                data += chunk
            })

            res.on("end", () => {
                const newData = JSON.parse(data)
                const dataTables: FoodlusZoneModel[] = newData.data.map(
                    (item: any) => {
                        //console.log(item)
                        return {
                            name: item.name,
                            serviceLocations: item.tables.map((table: any) => {
                                let result = {
                                    name: table.name,
                                    code: table.id,
                                    zoneId: table.room_id,
                                    zoneName: item.name
                                }
                                console.log(result)
                                return result
                            })
                        }
                    }
                )
                resolve(dataTables)
            })
        })

        req.on("error", (error) => {
            console.error(error)
            reject(error)
        })

        req.end()
    })
}

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
