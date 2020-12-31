import {Schema, model, Document} from "mongoose"
import bycript from "bcryptjs"

const sellersSchema = new Schema({
    //nombre
    nombre: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    //direccion
    direccion: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    //password
    password: {
        type: String,
        required: true,
        min: 6
    },
    //foto
    foto: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    }, 
    correo: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    //descripcion
    descripcion: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    pregunta: {
        type: String,
        required: true,
        min: true,
        lowercase: true
    },
    respuesta: {
        type: String
    }
    
})

sellersSchema.methods.encryptPass = async (password: string): Promise<string> => {
    const salt = await bycript.genSalt(10)
    return await bycript.hash(password,salt)
}

sellersSchema.methods.verifyPass = async function (password:string): Promise<Boolean> {
    return await bycript.compare(password, this.password)
}

sellersSchema.methods.encryptRes = async (res: string): Promise<string> => {
    const salt = await bycript.genSalt(10)
    return await bycript.hash(res, salt)
}

sellersSchema.methods.verifyRes = async function(response: string): Promise <boolean> {
    return await bycript.compare(response, this.respuesta)
}

export interface ISellers extends Document {
    nombre: string;
    descripcion: string;
    direccion: string;
    password: string;
    foto: string;
    correo: string;
    pregunta: string;
    respuesta: string;
    encryptPass(password:string): Promise<string>;
    verifyPass(password: string): Promise<Boolean>;
    encryptPass(password:string): Promise<string>;
    verifyPass(password:string): Promise<boolean>;
    encryptRes(res: string): Promise<string>;
    verifyRes(response: string): Promise<boolean>
}

export default model <ISellers>("Sellers", sellersSchema)