import { UsuariosMongoDAO as DAO } from "../DAO/usuariosMongoDAO.js"
import { UsuariosGetDTO } from "../DTO/usuarioas.DTO.js"



class UsuariosService{
    constructor(dao){
        this.dao=dao
    }

    async getUsuarios(){
        let usuarios= await this.dao.get()
        usuarios=usuarios.map(usuario=>new UsuariosGetDTO(usuario))
        return usuarios
    }

    async getUsuarioByEmail(email){
        let usuario = await this.dao.getBy(email)
        return new UsuariosGetDTO(usuario)
    }

    async createUsuario(usuario){
        return await this.dao.create(usuario)
    }

    async updateUsuario(email, usuario) {
        return await this.dao.update(email, usuario)
    }

    async deleteUsuario(email){
        return await this.dao.delete(email)
    }
}

export const usuariosService = new UsuariosService(new DAO())