import { Router } from "express";
import { generaUsuario } from "../mocks/productos.mocks.js";

export const router=Router()

router.get('/usuario', (req, res)=>{
    let usuario =  generaUsuario();

    console.log(`Se generó el usuario ${usuario.nombre} ${usuario.apellido}, con el email ${usuario.email} `);
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({usuario});
})