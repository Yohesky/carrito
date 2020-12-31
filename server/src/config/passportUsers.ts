import {Strategy, ExtractJwt, StrategyOptions} from "passport-jwt"
import Users from "../models/users/users"

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET_USER
}

export default new Strategy(opts, async (payload, done) => {
    try 
    {
        const user = await Users.findById(payload.id)

        if(user){
            return done(null, user.id)
        }

        return done(null,false)
    }

    catch(error){
        console.log(error);
        
    }
})