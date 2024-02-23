export class UsuariosGetDTO{
    constructor(usuario){
        this.codigo=usuario._id
        this.nombre=usuario.name
        this.email=usuario.email
        this.rol=usuario.role
    }
}