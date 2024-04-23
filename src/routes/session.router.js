import { Router } from "express";
import { usuariosModelo } from "../DAO/models/usuarios.model.js";
//import crypto from 'crypto';
import { error } from "console";
import { creaHash, validaPassword } from "../utils.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { enviarMail } from "../mail.js";
import bcrypt from 'bcrypt';


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
        id: req.user._id,
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


router.post("/recupero01", async (req, res)=>{

    let {email}= req.body;

    let usuario = await usuariosModelo.findOne({email}).lean()

    if(!usuario){
        //enviar mensaje de error por get params a la pagina recupero.html
        res.redirect("http://localhost:3000/login?error=Ocurrio un error al intentar resetear contraseña. Pongase en contacto con un administrador")
    }else{ 

    delete usuario.password
}
    let token=jwt.sign({...usuario}, "CoderCoder123", {expiresIn:"1h"});

    let mensaje = `Se ha solicitado gestionar una nueva clave para su usuario.
    Por favor haga click en el siguiente link para continuar: <a href="http://localhost:3000/api/session/recupero02?token=${token}">Crear nueva clave</a>
    En caso de no haber solicitado el cambio de clave omita este mensaje.`

    let respuesta= await enviarMail(email, "Recupero Password", mensaje);

    // res.setHeader('Content-Type','application/json');
    // return res.status(200).json({
    //     respuesta
    // });
    
    if(respuesta.accepted.length>0){
        res.redirect("http://localhost:3000/login?mensaje=Recibirá un correo con los pasos a seguir para recuperar su usuario")
    }else{
        res.redirect("http://localhost:3000/login?error=Ocurrio un error al intentar resetear contraseña")
    }
})

router.get("/recupero02", async(req,res)=>{
    let {token} = req.query;

    try{
        let datosToken=jwt.verify(token, "CoderCoder123")

        res.redirect("http://localhost:3000/recupero02.html?token="+token)
    }catch(error){
        res.redirect("http://localhost:3000/login?error=Error inesperado en el servidor - 500 ")
    }
})

router.post("/recupero03", async (req,res)=>{
    let {password, password2, token}= req.body
    if(password!==password2){
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({error:`Claves diferentes`})
    }

    
    try{
        let datosToken=jwt.verify(token, "CoderCoder123")
        let usuario =await usuariosModelo.findOne({email:datosToken.email}).lean()
        if(!usuario){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:"Error de usuario"})
        }

        if(bcrypt.compareSync(password, usuario.password)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:"La contraseña ingresada ya ha sido utilizada a previamente. Ingrese una nueva"})
        }

        let usuarioActualizado={...usuario, password:bcrypt.hashSync(password, bcrypt.genSaltSync(10))}

        await usuariosModelo.updateOne({email:datosToken.email}, usuarioActualizado)


        res.redirect("http://localhost:3000/login?mensaje=Se actualizó la contraseña correctamente")
    }catch(error){
        res.redirect("http://localhost:3000/login?error=Error inesperado en el servidor - 500 ")
    }

})