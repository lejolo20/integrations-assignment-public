import { Request, Response } from "express"
import https from "https"

export const loginController = async (req: Request, res: Response) => {
    const { username, password } = req.body

    const data = JSON.stringify({
        username,
        password
    })

    const options = {
        hostname: "dummyjson.com",
        path: "/auth/login",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const request = https.request(options, (response) => {
        let data = ""

        response.on("data", (chunk) => {
            data += chunk
        })

        response.on("end", () => {
            const token = JSON.parse(data).token
            if (token) {
                res.status(200).json({ token })
            } else {
                res.status(401).json({ message: "Authentication failed" })
            }
        })
    })

    request.on("error", (error) => {
        console.error(`Problem with request: ${error.message}`)
        res.status(500).json({ message: "An error occurred" })
    })

    request.write(data)
    request.end()
}
