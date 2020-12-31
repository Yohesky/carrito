import {Router} from "express"

const router: Router = Router()

import {signUp, signIn, recover} from "../../controllers/users/authUsers"

router.post("/signUp", signUp)

router.post("/signIn", signIn)

router.post("/recoverPass", recover)

export default router