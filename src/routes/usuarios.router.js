import { Router } from "express";
import { usuariosModelo } from "../DAO/models/usuarios.model.js";
import { ManagerUsuarios } from "../DAO/managerUsuarios.js";
import mongoose from "mongoose";
import { UsuariosController } from "../controller/usuarios.controller.js";
export const router = Router()

const managerUsuarios = new ManagerUsuarios();

router.get('/', UsuariosController.getUsuarios)

router.get('/:uid', UsuariosController.getUsuarioById)

router.post('/', UsuariosController.createUsuario)

router.put('/:email', UsuariosController.updateUsuario)

router.delete('/:email', UsuariosController.deleteUsuario)



//router.get('/', async (req, res) => {

    // let usuarios=[{nombre:'Juan', email:'jlopez@gmail.com'}]
    //let usuarios=[]
    //try {
    //    usuarios=await usuariosModelo.find({deleted:false})
    //} catch (error) {
    //    console.log(error.message)        
    //}

//    const usuarios = managerUsuarios.listarUsuarios();
//    res.status(200).json({
//        usuarios
//    })
//})



/*router.get('/:id', async (req, res) => {
    let { id } = req.params

    try {
        const usuario = await managerUsuarios.userById(id);

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ usuario });
    }
    catch(error){
        res.setHeader('Content-Type', 'application/json');
        if (error.message.includes('No existen usuarios')) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(500).json({ error: 'Error inesperado en el servidor. Intente más tarde o contacte a su administrador.' });
        }
    }
})*/

/*router.post('/', async (req, res) => {
    let { nombre, email, apellido } = req.body
    
    try{
        const nuevoUsuario= await managerUsuarios.createUser({nombre, email, apellido});
        res.status(200).json({payload: nuevoUsuario});
    }catch(error){
        res.setHeader('Content-Type', 'application/json');
        if (error.message.includes('Faltan datos') || error.message.includes('ya existe en BD')) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(500).json({ error: 'Error inesperado en el servidor. Intente más tarde o contacte a su administrador.' });
        }
    }

});*/




/*router.put('/:id', async (req, res) => {
    let { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ingrese un id valido` })
    }

    let existe
    try {
        existe = await usuariosModelo.findOne({ deleted: false, _id: id })
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`, detalle: error.message })
    }

    if (!existe) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `No existen usuarios con id ${id}` })
    }

    if (req.body._id || req.body.email) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `No se puede modificar las propiedades "id o email"` })
    }

    let resultado
    try {
        resultado = await usuariosModelo.updateOne({ deleted: false, _id: id }, req.body)
        console.log(resultado);
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ payload: resultado });
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`, detalle: error.message })
    }

})*/



/*router.delete('/:id', async (req, res) => {
    let { id } = req.params

    try {
        const resultado = await managerUsuarios.deleteUser(id);
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ payload: resultado });
    } 
    catch (error) {
        res.setHeader('Content-Type', 'application/json');
        if (error.message.includes('No existen usuarios')) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(500).json({ error: 'Error inesperado en el servidor. Intente más tarde o contacte a su administrador.' });
        }
    }

})*/

