import { usuariosModelo } from "./models/usuarios.model.js";

export class UsuariosMongoDAO{
   
    async get(){
        return usuariosModelo.find()
    }

    async getByEmail(email){
        let usuario
        return usuario= await usuariosModelo.findOne({deleted: false, email})
    }

    async getBy(id){
        let usuario
        return usuario= await usuariosModelo.findOne({deleted: false, _id: id})
    }

    async create(usuario){
        return await usuariosModelo.create(usuario)
    }

    async update(id, usuario) {
        return await usuariosModelo.updateOne({ _id: id, deleted: false }, usuario);
    }

    async updateByEmail(email, usuario) {
        return await usuariosModelo.updateOne({ email: email, deleted: false }, usuario);
    }

    async delete(email){
        return await usuariosModelo.updateOne({ deleted: false, email }, { $set: { deleted: true } });;
    }
}

