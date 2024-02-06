import { NextFunction, Request, Response } from "express"

export const isLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const isLogged = req.headers.authorization
        if (isLogged) return next()
        else return res.status(401).json({ message: "Unauthorized" })
    } catch (error) {
        console.log(error)
    }
}
