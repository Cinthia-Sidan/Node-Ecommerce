import { usuariosModelo } from "./models/usuarios.model.js";

export class ManagerUsuarios{
    async listarUsuarios(){
        try{
            return await usuariosModelo.find()
        }catch(error){
            console.log(error);
            return null
        }
    }
}
