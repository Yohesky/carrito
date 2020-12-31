import mongoose from "mongoose"

// const {MONGODB_URI} = process.env

mongoose.connect('mongodb://localhost/carrito', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
    })
    .then(db => console.log("conectado a la bd"))
    .catch(err => console.log(err))