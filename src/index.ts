import express from "express"
import https from "https"
import dotenv from "dotenv"

const app = express()

app.use(express.json())

dotenv.config()

const headers = {
    tenant: process.env.REVO_TENANT as string,
    Authorization: `Bearer ${process.env.REVO_TOKEN as string}`,
    "client-token": process.env.REVO_CLIENT_TOKEN as string
}

const options = {
    hostname: "integrations.revoxef.works",
    port: 443,
    path: "/api/external/v2/paymentMethods",
    method: "GET",
    headers: headers
}

const req = https.request(options, (res) => {
    let data = ""

    res.on("data", (chunk) => {
        data += chunk
    })

    res.on("end", () => {
        console.log(JSON.parse(data))
    })
})

req.on("error", (error) => {
    console.error(error)
})

req.end()

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

//import { FoodlusZoneModel } from "./models/tables";

//const getRevoTables = (): FoodlusZoneModel => {} // TODO: Create getRevoTables function
