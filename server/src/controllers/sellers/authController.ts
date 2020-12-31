import {Request, Response, json} from "express"
import Sellers, { ISellers } from "../../models/sellers/sellers"
import fs from "fs-extra"
import path from "path"
import jwt from "jsonwebtoken"


function createToken(seller: ISellers){
    return jwt.sign({id: seller.id, username: seller.nombre}, process.env.TOKEN_SECRET || "tokenaunx")
}

export async function signUp(req: Request, res: Response) {
    const {nombre, descripcion, correo, direccion, password, pregunta, respuesta} = req.body
    const newSeller = {nombre, descripcion, correo, direccion, password, foto: req.file.path, pregunta, respuesta}
    const seller: ISellers = new Sellers(newSeller)

    seller.password = await seller.encryptPass(password)

    seller.respuesta = await seller.encryptRes(respuesta)

    const savedSeller = await seller.save()
    return res.json(savedSeller)
}

export async function signIn(req: Request, res: Response) {
   const nombre = req.body.nombre
   const password = req.body.password

   if(!nombre || !password){
       return res.status(400).json({msg: "Ingrese todos los campos"})
   }
   

   const seller = await Sellers.findOne({nombre: nombre})

   if(!seller){
       return res.status(400).json({msg: "este nombre no existe"})
   }

   const isMatch = await seller.verifyPass(req.body.password)

   if(isMatch){
       return res.status(200).json({token: createToken(seller), seller})
   }

   return res.status(400).json({msg: "Credenciales invalidas"})
}

export async function recover(req: Request, res: Response){
    const {clientRes, correo, pass} = req.body
   
    console.log('correo:',correo, 'respuesta cliente:',clientRes, 'nueva clave:', pass);
    
    const seller = await Sellers.findOne({correo})
    
    if(!seller)
    {  
        return res.json({msg: "Este correo no existe"})
    }

    const showPregunta = seller?.pregunta
    res.json(showPregunta)
    const isMatch = await seller?.verifyRes(clientRes)

    if(isMatch){
        updatePass(pass,seller?.correo ,seller)
    }

    if(!isMatch){
        return res.status(400).json({msg: "Invalidas"})
    }
   

    
    
}


async function updatePass(pass: string, correo: string | any, seller: ISellers | any){
    console.log("same");
        
        //updatePass(pass, seller, res, req)
        const actPassword = await seller?.encryptPass(pass)
        console.log('contrasena encriptada',actPassword);
        
          const actpass = await Sellers.findOneAndUpdate({correo}, {
              password: actPassword
          })

         console.log('act');
}   