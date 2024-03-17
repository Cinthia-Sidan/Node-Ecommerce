import { Router } from "express";
import { usuariosModelo } from "../DAO/models/usuarios.model.js";
//import crypto from 'crypto';
import { error } from "console";
import { creaHash, validaPassword } from "../utils.js";
import passport from "passport";
export const router = Router()

router.get('/errorLogin', (req,res)=>{
    return res.redirect('/login?error=Error en el proceso de login..')
})

router.post('/login',passport.authenticate('login', {failureRedirect:'/api/session/errorLogin'}) , async (req, res) => {
    /*let { email, password } = req.body

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
    }*/

    console.log(req.user);

    req.session.usuario = {
        nombre: req.user.nombre,
        email: req.user.email,
        role: req.user.role
    }

    res.redirect('/perfil')

})

router.get('/errorRegistro', (req,res)=>{
    return res.redirect('/registro?error=Error en el proceso de registro')
})

router.post('/registro', passport.authenticate('registro', {failureRedirect: '/api/session/errorRegistro'}), async (req, res) => {
    
    let { email } = req.body
    /*let { nombre, email, password } = req.body

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
    }*/

    res.redirect(`/login?mensaje=Usuario ${email} registrado correctamente`)
})

router.post('/registroAdmin', passport.authenticate('registroAdmin', {failureRedirect: '/api/session/errorRegistro'}), async (req, res) => {
    
    let { email } = req.body

    res.redirect(`/login?mensaje=Usuario ${email} registrado correctamente`)
})

router.get('/logout',(req, res)=>{
    req.session.destroy(error=>{
        if(error){
            res.redirect('/login?error=fallo en el logout')
        }

        res.redirect('/login')
    })
})

router.get('/github',passport.authenticate('github',{}) ,(req,res)=>{})

router.get('/callbackGithub', passport.authenticate('github',{failureRedirect:'/api/session/errorLogin'}), (req,res)=>{
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        message: "Acceso OK!!"
    });
})