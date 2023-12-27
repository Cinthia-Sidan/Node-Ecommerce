import { Router } from "express";
import { ManagerUsuarios } from "../DAO/managerUsuarios.js";
export const router=Router();

const managerUsuarios = new ManagerUsuarios();


const auth=(req, res, next)=>{
    if(!req.session.usuario){
        res.redirect('/login')
    }

    next()
}

router.get('/',(req,res)=>{

    res.setHeader('Content-Type', 'text/html');
    res.status(200).render('home')
})

router.get('/registro', (req,res)=>{

    let {error}=req.query

    res.setHeader('Content-Type','text/html')
    res.status(200).render('registro', {error})
})

router.get('/login', (req,res)=>{
    let {error, mensaje}=req.query;

    res.setHeader('Content-Type','text/html')
    res.status(200).render('login',{error, mensaje})
})

router.get('/perfil', auth, (req,res)=>{
    
    let usuario=req.session.usuario;

    res.setHeader('Content-Type','text/html')
    res.status(200).render('perfil', {usuario})
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