import { Router } from "express";
import { ManagerUsuarios } from "../DAO/managerUsuarios.js";
import { ProductosController } from "../controller/productos.controller.js";
export const router=Router();

const managerUsuarios = new ManagerUsuarios();

//El auth es para proteger vistas.Si en este caso no existe una sesion lo redirecciona  al login
const auth=(req, res, next)=>{
    if(!req.session.usuario){
        return res.redirect('/login')
    }

    next()
}


//En este caso si ya existe una sesion va a redireccionar al perfil
const auth2=(req, res, next)=>{
    if(req.session.usuario){
       return res.redirect('/perfil')
    }

    next()
}

//router.get('/',(req,res)=>{

//    res.setHeader('Content-Type', 'text/html');
//    res.status(200).render('home', {login:req.session.usuario?true:false})
//})

router.get('/registro',auth2 ,(req,res)=>{

    let {error}=req.query

    res.setHeader('Content-Type','text/html')
    res.status(200).render('registro', {error, login:false})
})

router.get('/login',auth2 ,(req,res)=>{
    let {error, mensaje}=req.query;

    res.setHeader('Content-Type','text/html')
    res.status(200).render('login',{error, mensaje, login:false})
})


router.get('/perfil', auth, (req,res)=>{
    
    let usuario=req.session.usuario;

    res.setHeader('Content-Type','text/html')
    res.status(200).render('perfil', {usuario, login:true})
})

router.get('/usuarios',async(req,res)=>{

    let usuarios = await managerUsuarios.listarUsuarios();
    if(!usuarios){
        console.log('No se recuperaron usuarios');
        usuarios=[];
    }

    console.log(usuarios);

    res.setHeader('Content-Type','text/html')
    res.status(200).render('usuarios', {usuarios})
})

router.get('/', ProductosController.getProductos)