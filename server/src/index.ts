import express, {Application} from "express"

import cors from "cors"
import passport from "passport"
import morgan from "morgan"
import path from "path"

import passportmiddleware from "./config/passport"
//import passportmiddlewareUsers from "./config/passportUsers"

import auth from "./routes/sellers/auth"
import articles from "./routes/sellers/articles"
import users from "./routes/users/authUsers"

import articlesUser from "./routes/users/articles/articles"


const index: Application = express()


import "./database"


index.set('port',process.env.PORT || 8000)

index.use(morgan('dev'))
index.use(express.json())
index.use(cors())
index.use(passport.initialize())

passport.use(passportmiddleware)
// passport.use(passportmiddlewareUsers)

//routes
index.use('/sellers',auth)
index.use('/users', users)
index.use('/sellers/articles',articles)

index.use('/users/articles', articlesUser)

index.use('/uploads', express.static(path.resolve('uploads')))


export default index