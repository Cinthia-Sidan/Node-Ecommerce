import { carritosService } from "../services/carritos.service.js";
import { productosService } from "../services/productos.service.js";
import { usuariosService } from "../services/usuarios.service.js";





export class CarritosController {
    constructor() { }

    static async getCarritos(req, res) {
        let carritos = await carritosService.getCarritos()

        if (!carritos) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(500).json({ error: `Error inesperado en el servidor` })
        } else {
            res.setHeader('Content-Type', 'application/json')
            return res.status(200).json({ carritos });
        }

    }

    static async getCarritoById(req, res) {
        let carrito = await carritosService.getCarritoById(req.params.cid)

        if (!carrito) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(500).json({ error: `Error inesperado en el servidor` })
        } else {
            res.setHeader('Content-Type', 'application/json')
            return res.status(200).json({ carrito });
        }

    }

    static async createCarrito(req, res) {
        let {usuarioId, pedido}=req.body

        let usuario =await usuariosService.getUsuarioById(usuarioId);


        //PEDIDO: [{id:2, cantidad:3},{id:5, cantidad:4}]
        let error=false
        let total=0


        for (let item of pedido) {

            let producto= await productosService.getProductoById(item.id)
            if(!producto){
                console.log(`El producto con id ${item.id} no existe`);
                error=true;
                break;
            }

            item.descripcion=producto.descripcion
            item.precio=producto.precio
            item.subtotal=producto.precio*item.cantidad

            total+=producto.precio*item.cantidad
        };

        if(error){
            res.setHeader('Content-Type', 'application/json')
            return res.status(500).json({ error: `Error al agregar producto al carrito` })

        }

        console.log(pedido);

        let numero=Date.now()

        let nuevoCarrito= await carritosService.createCarrito({
            numero,
            usuario: usuarioId,
            productos: pedido,
            total

        })

        if (!nuevoCarrito) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(500).json({ error: `Error inesperado en el servidor al crear Carrito` })
        } else {

            usuario.carritos.push(nuevoCarrito._id)
            await usuariosService.updateUsuario(usuarioId, usuario)

            res.setHeader('Content-Type', 'application/json')
            return res.status(200).json({ nuevoCarrito });
        }

    }

}