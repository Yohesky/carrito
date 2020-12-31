import {Router} from "express"

import { getAll } from "../../../controllers/sellers/articles"
import {buyArticles, myCar, deleteBuy} from "../../../controllers/users/buyArticles"
import passport from "passport"
const router: Router = Router()


router.get("/all", passport.authenticate("jwt", {session: false}), getAll)

router.post("/buy/:id", passport.authenticate("jwt", {session: false}), buyArticles)

router.get("/car", passport.authenticate("jwt", {session:false}), myCar)

router.delete("/deleteBuy/:id", passport.authenticate("jwt", {session:false}), deleteBuy)


export default router