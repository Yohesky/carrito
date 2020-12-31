import {Schema, Document, model} from "mongoose"
import bycript from "bcryptjs"

const userSchema = new Schema({
    nombre: {
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

    apellido: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    ci: {
        type: Number,
        required: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        min: 4
    },

    direccion: {
        type: String,
        required: true,
        min: true,
        lowercase: true
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

userSchema.methods.encryptPass = async (password: string): Promise<string> => {
    const salt = await bycript.genSalt(10)
    return await bycript.hash(password, salt)
}

userSchema.methods.verifyPass = async function(password: string): Promise<boolean> {
    return await bycript.compare(password, this.password)
}


userSchema.methods.encryptRes = async (res: string): Promise<string> => {
    const salt = await bycript.genSalt(10)
    return await bycript.hash(res, salt)
}

userSchema.methods.verifyRes = async function(response: string): Promise <boolean> {
    return await bycript.compare(response, this.respuesta)
}

export interface IUsers extends Document {
    nombre: string;
    correo: string;
    apellido: string;
    ci: number;
    password: string;
    direccion: string;
    pregunta: string;
    respuesta: string;
    encryptPass(password:string): Promise<string>;
    verifyPass(password:string): Promise<boolean>;
    encryptRes(res: string): Promise<string>;
    verifyRes(response: string): Promise<boolean>

}

export default model <IUsers>("Users", userSchema)