import express, { Request, Response } from "express"
import https from "https"
import dotenv from "dotenv"
import { FoodlusZoneModel } from "./models/tables"
import { router } from "./routes/getTables"

const app = express()

app.use(express.json())

dotenv.config()

app.get("/", (_req: Request, res: Response) => {
    res.send("Hello World!")
})

app.use("/api/external/v2/", router)

const headers = {
    tenant: process.env.REVO_TENANT as string,
    Authorization: `Bearer ${process.env.REVO_TOKEN as string}`,
    "client-token": process.env.REVO_CLIENT_TOKEN as string
}

const options = {
    hostname: "integrations.revoxef.works",
    port: 443,
    path: "/api/external/v2/rooms?withTables",
    method: "GET",
    headers: headers
}

const getRevoTables = (): Promise<FoodlusZoneModel[]> => {
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
                        return {
                            name: item.name,
                            serviceLocations: item.tables.map((table: any) => {
                                return {
                                    name: table.name,
                                    code: table.id,
                                    zoneId: table.room_id,
                                    zoneName: item.name
                                }
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

getRevoTables().then((data) => {
    console.log(data)
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
