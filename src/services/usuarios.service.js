import { UsuariosMongoDAO as DAO } from "../DAO/usuariosMongoDAO.js"



class UsuariosService{
    constructor(dao){
        this.dao=new dao()
    }

    async getUsuarios(){
        return await this.dao.get()
    }

    async getUsuarioByEmail(email){
        return await this.dao.getBy(email)
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

export const usuariosService = new UsuariosService(DAO)