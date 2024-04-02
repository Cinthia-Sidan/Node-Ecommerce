import { Router } from "express";
import { ManagerUsuarios } from "../DAO/managerUsuarios.js";
import { ProductosController } from "../controller/productos.controller.js";
import { productosService } from "../services/productos.service.js";
import { CarritosController } from "../controller/carritos.controller.js";
export const router = Router();

const managerUsuarios = new ManagerUsuarios();


//El auth es para proteger vistas.Si en este caso no existe una sesion lo redirecciona  al login
const auth = (req, res, next) => {
    if (!req.session.usuario) {
        return res.redirect('/login')
    }

    const userId = req.session.usuario.id;
    // Verifica si el usuario tiene el rol de 'admin'
    const isAdmin = req.session.usuario.role === 'admin';

    // Pasa isAdmin a la plantilla
    res.locals.isAdmin = isAdmin;

    next()

    
}

//Auth 3 es para administrador
const auth3 = (req, res, next) => {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }

    // Verifica si el usuario tiene el rol de 'admin'
    const isAdmin = req.session.usuario.role === 'admin';

    if (!isAdmin) {
        return res.status(403).send('No tienes permiso para acceder a esta página');
    }

    // Pasa isAdmin a la plantilla
    res.locals.isAdmin = isAdmin;

    next();
};


//En este caso si ya existe una sesion va a redireccionar al perfil
const auth2 = (req, res, next) => {
    if (req.session.usuario) {
        // Verifica si el usuario tiene el rol de 'admin'
        const isAdmin = req.session.usuario.role === 'admin';

        // Pasa isAdmin a la plantilla
        res.locals.isAdmin = isAdmin;
        return res.redirect('/perfil')
    }



    next()
}

//router.get('/',(req,res)=>{

//    res.setHeader('Content-Type', 'text/html');
//    res.status(200).render('home', {login:req.session.usuario?true:false})
//})

router.get('/registro', auth2, (req, res) => {

    let { error } = req.query

    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('registro', { error, login: false })
})

router.get('/registroAdmin', auth3, (req, res) => {

    let { error } = req.query

    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('registroAdmin', {login: req.session.usuario ? true : false ,isAdmin: req.session.usuario && req.session.usuario.role === 'admin', error })
})

router.get('/login', auth2, (req, res) => {
    let { error, mensaje } = req.query;

    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('login', { error, mensaje, login: false })
})


router.get('/perfil', auth, (req, res) => {

    let usuario = req.session.usuario;

    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('perfil', { usuario, login: true })
})

router.get('/usuarios', auth, async (req, res) => {

    let usuarios = await managerUsuarios.listarUsuarios();
    if (!usuarios) {
        console.log('No se recuperaron usuarios');
        usuarios = [];
    }

    console.log(usuarios);

    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('usuarios', { usuarios })
})

router.get('/', ProductosController.getProductos)

// Ruta para renderizar la pantalla de cargar productos
router.get('/cargar-productos',auth3, async (req, res) => {

    let { error, mensaje } = req.query;
    const productos = await productosService.getProductos()

    console.log(productos);

    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('cargar-productos', { login: req.session.usuario ? true : false ,isAdmin: req.session.usuario && req.session.usuario.role === 'admin', error: null, productos: productos, mensaje });



});

router.get('/carrito/:uid', auth, CarritosController.getCarritoByUser);
