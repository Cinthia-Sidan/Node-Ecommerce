import { UsuariosMongoDAO as DAO } from "../DAO/usuariosMongoDAO.js"



class UsuariosService{
    constructor(dao){
        this.dao=new dao()
    }

    async getUsuarios(){
        return await this.dao.get()
    }

    async getUsuarioByEmail(email){
        return await this.dao.getByEmail(email)
    }

    async getUsuarioById(id){
        return await this.dao.getBy(id)
    }

    async createUsuario(usuario){
        return await this.dao.create(usuario)
    }

    async updateUsuarioByEmail(email, usuario) {
        return await this.dao.updateByEmail(email, usuario)
    }
    async updateUsuario(id, usuario) {
        return await this.dao.update(id, usuario)
    }

    async deleteUsuario(email){
        return await this.dao.delete(email)
    }
}

export const usuariosService = new UsuariosService(DAO)