import { usuariosModelo } from "./models/usuarios.model.js";

export class UsuariosMongoDAO{
   
    async get(){
        return usuariosModelo.find()
    }

    async getBy(email){
        let usuario
        return usuario= await usuariosModelo.findOne({deleted: false, email})
    }

    async create(usuario){
        return await usuariosModelo.create(usuario)
    }

    async update(email, usuario) {
        return await usuariosModelo.findOneAndUpdate({ email: email, deleted: false }, usuario, { new: true });
    }

    async delete(email){
        return await usuariosModelo.updateOne({ deleted: false, email }, { $set: { deleted: true } });;
    }
}

