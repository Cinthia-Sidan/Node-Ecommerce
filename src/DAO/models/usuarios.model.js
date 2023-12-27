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
        deleted: {
            type: Boolean, default: false 
        }
    },
    {
        timestamps: true,
        //timestamps guarda el tiempo en el que se guardo el dato nuevo, Strict permite agregar valores que no estan en la estructura
        strict: true
    }
)

export const usuariosModelo=mongoose.model(usuariosColeccion, usuariosEsquema)


 