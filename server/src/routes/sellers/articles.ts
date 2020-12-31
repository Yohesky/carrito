import {Router} from "express"
import multer from "../../libs/multer"
import passport from "passport"

const router: Router = Router()

import {getOne, getAll, myArticles, saveArticicle, updateArticle, deleteArticle} from "../../controllers/sellers/articles"

router.get("/all", passport.authenticate("jwt", {session: false}), getAll)

router.get("/myArticles", passport.authenticate("jwt", {session: false}), myArticles)

router.get("/article/:id", passport.authenticate("jwt", {session: false}), getOne)

router.post("/saveArticle", multer.single("image"), passport.authenticate("jwt", {session: false}),saveArticicle)

router.put("/updateArticle/:id", multer.single("image"), passport.authenticate("jwt", {session: false}), updateArticle)

router.delete("/deleteArticle/:id", passport.authenticate("jwt", {session: false}), deleteArticle)

export default router