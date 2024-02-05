import { Router } from "express"
import { postTablesController } from "../controller/getTablesController"

const router = Router()

router.post("/gettables", postTablesController)

export { router }
