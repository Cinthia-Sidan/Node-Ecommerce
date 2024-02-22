import mongoose from "mongoose";

const usuariosColeccion='usuarios'
const usuariosEsquema=new mongoose.Schema(
    {
        nombre: String, apellido: String,
        email: {
           type: String, unique:true, required: true 
        },
        password: String, 
        edad: Number,
        cart: {type: mongoose.Schema.Types.ObjectId, ref: 'Cart'},
        role: {type: String, default: 'user'}, 
        deleted: {
            type: Boolean, default: false 
        }
    },
    {
        timestamps: true,
        //timestamps guarda el tiempo en el que se guardo el dato nuevo, Strict permite agregar valores que no estan en la estructura
        strict: false
    }
)

export const usuariosModelo=mongoose.model(usuariosColeccion, usuariosEsquema)


 