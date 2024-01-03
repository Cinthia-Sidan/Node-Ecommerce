import { Router } from "express";
import { usuariosModelo } from "../DAO/models/usuarios.model.js";
//import crypto from 'crypto';
import { error } from "console";
import { creaHash, validaPassword } from "../utils.js";
export const router = Router()

router.post('/login', async (req, res) => {
    let { email, password } = req.body

    if (!email || !password) {
        return res.redirect('/login?error=Complete todos los datos')
    }

    //password = crypto.createHmac("sha256", "coder123").update(password).digest("hex");


    let usuario = await usuariosModelo.findOne({ email})
    if (!usuario) {
        return res.redirect('/login?error=Credenciales incorrectas')
    }
    if (!validaPassword(usuario, password)) {
        return res.redirect('/login?error=Credenciales incorrectas')
    }
    req.session.usuario = {
        nombre: usuario.nombre,
        email: usuario.email
    }

    res.redirect('/perfil')

})

router.post('/registro', async (req, res) => {
    let { nombre, email, password } = req.body

    if (!nombre || !email || !password) {
        return res.redirect('/registro?error=Complete todos los datos')
    }

    let existe = await usuariosModelo.findOne({ email })

    if (existe) {
        return res.redirect('/registro?error=Ya existe un usuario con ese email')
    }

    //password = crypto.createHmac("sha256", "coder123").update(password).digest("hex");

    password=creaHash(password);

    let usuario
    try {
        usuario=await usuariosModelo.create({nombre, email, password})
        res.redirect(`/login?mensaje=Usuario ${email} registrado correctamente`)
        
    } catch (error) {
        res.redirect('/registro?error=Error inesperado. Reintente en unos minutos')
    }

})

router.get('/logout',(req, res)=>{
    req.session.destroy(error=>{
        if(error){
            res.redirect('/login?error=fallo en el logout')
        }

        res.redirect('/login')
    })
})

