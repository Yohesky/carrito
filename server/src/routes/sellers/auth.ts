import {Router} from "express"
import {signUp, signIn, recover} from "../../controllers/sellers/authController"
import multer from "../../libs/multer"

const router = Router()

router.post('/signUp', multer.single('image'),signUp)


router.post('/signIn', signIn)

router.post('/recoverSeller', recover)

export default router