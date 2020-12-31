import {Strategy, ExtractJwt, StrategyOptions} from "passport-jwt"
import Sellers from "../models/sellers/sellers"
import Users from "../models/users/users"

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET
}

export default new Strategy(opts, async (payload, done) => {
    try 
    {
        const seller = await Sellers.findById(payload.id)
        const user = await Users.findById(payload.id)

          if(seller){
              return done(null, seller.id)
          }

         if(user){
             return done(null, user.id)
         }

         return done(null,false)
        
    }

    catch(error){
        console.log(error);
        
    }
})