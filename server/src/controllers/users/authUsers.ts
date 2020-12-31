import {Request, Response} from "express"
import Users, {IUsers} from "../../models/users/users"
import jwt from "jsonwebtoken"
import users from "../../models/users/users"

function createToken(user: IUsers){
    return jwt.sign({id: user.id, username: user.correo}, process.env.TOKEN_SECRET || "tokenaunxuser")
}

export async function signUp(req: Request, res: Response) {
    const {nombre, apellido, ci, direccion, password, correo, pregunta, respuesta}  = req.body

     const userFound = await Users.findOne({correo: correo})

     if(userFound){
         return res.status(400).json({msg: "Este correo ya existe"})
     }

    
    const newUser = {nombre, apellido, ci, direccion, password, correo, pregunta, respuesta}

    const user: IUsers = new Users(newUser)

    user.password = await user.encryptPass(password)

    user.respuesta = await user.encryptRes(respuesta)


    const savedUser = await user.save()

    return res.json(savedUser)

}


export async function signIn(req: Request, res: Response) {
    const {correo, password} = req.body
    if(!correo || !password){
        return res.status(400).json({msg:"Inserte todos los campos"})
    }

    const user = await Users.findOne({correo: correo})

    if(!user){
        return res.status(400).json({msg:"Este correo no existe"})
    }

    const isMatch = await user.verifyPass(password)

    if(isMatch){
        return res.status(200).json({token: createToken(user), user})
    }

    return res.status(400).json({msg: "Credenciales invalidas"})
}

export async function recover(req: Request, res: Response){
    const {clientRes, correo, pass} = req.body
   
    console.log('correo:',correo, 'respuesta cliente:',clientRes, 'nueva clave:', pass);
    
    const user = await Users.findOne({correo})
    
    if(!user)
    {  
        return res.json({msg: "Este correo no existe"})
    }

    const showPregunta = user?.pregunta
    res.json(showPregunta)
    const isMatch = await user?.verifyRes(clientRes)

    if(isMatch){
        updatePass(pass,user?.correo ,user)
    }

    if(!isMatch){
        return res.status(400).json({msg: "Invalidas"})
    }
   

    
    
}


async function updatePass(pass: string, correo: string | any, user: IUsers | any){
    console.log("same");
        
        //updatePass(pass, user, res, req)
        const actPassword = await user?.encryptPass(pass)
        console.log('contrasena encriptada',actPassword);
        
          const actpass = await Users.findOneAndUpdate({correo}, {
              password: actPassword
          })

         console.log('act');
}   