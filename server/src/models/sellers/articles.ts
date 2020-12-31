import {Schema, model, Document} from "mongoose"
import bycript from "bcryptjs"


const articleSchema = new Schema({
    //titulo
    titulo: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    //direccion
    precio: {
        type: Number,
        required: true,
        lowercase: true,
        trim: true
    },
    //foto
    foto: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    }, 
    //descripcion
    descripcionArticulo: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    cantidad: {
        type: Number
    },
    pedidos: {
        type: Number
    },
    idSeller: {
        type: String,
        
    },
    idPurchase: {
        required: false,
        type: String
    }
    
})


export interface IArticle extends Document {
    titulo: string;
    descripcionArticulo: string;
    precio: number;
    cantidad: number;
    foto: string;
    pedidos: number;
    idSeller: any;
    idPurchase: any;
}

export default model <IArticle>("Article", articleSchema)