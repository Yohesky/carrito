import {Schema, Document, model} from "mongoose"

const buyPurchase = new Schema({
    idUser: {
        type: String,
        required: true
    },
    idArticle: {
        type: String,
        required: true
    },
    
})

export interface IBuy extends Document {
    idUser: any;
    idArticle: string;
}

export default model<IBuy>("Purchases", buyPurchase)