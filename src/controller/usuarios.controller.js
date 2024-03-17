import { usuariosService } from "../services/usuarios.service.js"

export class UsuariosController {
    constructor() { }

    //agregando el static no necesito crear una instancia en el router para llamar a la funcion
    static async getUsuarios(req, res) {

        let usuarios = await usuariosService.getUsuarios()

        if (!usuarios) {
            res.setHeader('Content-Type', 'application/json')
            res.status(500).json({ error: `Error inesperado en el servidor` })
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json({ usuarios })
        }


        //const usuarios = ManagerUsuarios.listarUsuarios();
        //res.status(200).json({
        //usuarios
        //})

    }

    static async getUsuarioById(req, res) {

        let usuario = await usuariosService.getUsuarioById(req.params.uid)

        if (!usuario) {
            res.setHeader('Content-Type', 'application/json')
            res.status(500).json({ error: `Error inesperado en el servidor` })
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json({ usuario })
        }
        //const usuarios = ManagerUsuarios.listarUsuarios();
        //res.status(200).json({
        //usuarios
        //})

    }

    static async createUsuario(req, res) {
        let { nombre, email, password, edad } = req.body
        if (!nombre || !email || !password || !edad) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Complete los datos` })
        }

        // valide que el usuario no existe
        let existe = await usuariosService.getUsuarioByEmail(email)
        if (existe) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `El usuario con email ${email} ya existe en DB` })
        }

        const role = "user";
        // grabar usuario en DB
        let nuevoUsuario = await usuariosService.createUsuario({ nombre, email, password, edad, role })

        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({ nuevoUsuario })
    }

    static async updateUsuario(req, res) {
        let { email } = req.params

        try {
            // Verificar si el usuario existe
            let existe = await usuariosService.getUsuarioByEmail(email);
            if (!existe) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(404).json({ error: `No existen usuarios con el email ${email}` })
            }

            // Actualizar el usuario
            let resultado = await usuariosService.updateUsuario(email, req.body);

            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ payload: resultado });
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({ error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`, detalle: error.message })
        }

    }

    static async deleteUsuario(req, res) {
        let { email } = req.params

        try {
            // Verificar si el usuario existe
            let existe = await usuariosService.getUsuarioByEmail(email);
            if (!existe) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(404).json({ error: `No existen usuarios con el email ${email}` })
            }

            const resultado = await usuariosService.deleteUsuario(email);
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
    }
}