import mongoose from "mongoose";

const productCollection = "productos";

const productSchema = new mongoose.Schema({
    nombre:{type: String, required: true, max: 400 },
    stock:{type: Number, required: true, max: 10000 },
    precio:{type: Number, required: true, max: 1000000 },
    descripcion:{type: String, required: true, max: 1000 }
})


export const productModel = mongoose.model(productCollection, productSchema)
