import { Router } from "express"
import { postTablesController } from "../controller/getTablesController"
import { isLogin } from "../controller/authController"

const router = Router()

router.post("/gettables", isLogin, postTablesController)

export default router
