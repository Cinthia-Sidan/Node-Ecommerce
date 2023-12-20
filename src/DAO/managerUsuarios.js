import { usuariosModelo } from "./models/usuarios.model.js";

export class ManagerUsuarios {
    async listarUsuarios() {
        try {
            return await usuariosModelo.find()
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async userById(id) {

        try {

            if (!mongoose.Types.ObjectId.isValid(id)) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ error: `Ingrese un id valido` })
            }

            let usuario
            try {
                usuario = await usuariosModelo.findOne({ deleted: false, _id: id })
            } catch (error) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(500).json({ error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`, detalle: error.message })
            }

            if (!usuario) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ error: `No existen usuarios con id ${id}` })
            }

            return usuario;

        } catch (error) {
            console.log(error.message);
            throw error;
        }

    }

    async createUser({ nombre, email, apellido }) {

        try {
            if (!nombre || !email) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ error: `Faltan datos: nombre y email obligatorios...!!!` })
            }

            let existe = false
            try {
                existe = await usuariosModelo.findOne({ deleted: false, email })
            } catch (error) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(500).json({ error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`, detalle: error.message })
            }

            if (existe) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ error: `El usuario con email ${email} ya existe en BD...!!!` })
            }


            let nuevoUsuario = await usuariosModelo.create({ nombre, email, apellido })
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ payload: nuevoUsuario });
            
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({ error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`, detalle: error.message })
        }
    }

    async deleteUser(id) {
        try {
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

            const resultado = await usuariosModelo.updateOne({ deleted: false, _id: id }, { $set: { deleted: true } });
            return resultado;
        }
        catch (error) {
            console.log(error.message);
            throw error;
        }
    }

}
