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

    static async getCarritoByUser(req, res) {
        const userId = req.params.uid;
        let carrito = await carritosService.getCarritoByUser(userId)
        console.log(carrito);
        if (!carrito) {
            res.setHeader('Content-Type', 'text/html')
            return res.status(500).json({ error: `Error inesperado en el servidor` })
    
        } else {
            //res.setHeader('Content-Type', 'application/json')
            //return res.status(200).json({ carrito });

            res.setHeader('Content-Type', 'text/html')
            res.status(200).render('mi-carrito', { login: req.session.usuario ? true : false, carrito: carrito });
        }

    }

    static async createCarrito(req, res) {
        //let {usuarioId, pedido}=req.body

        let { pedido } = req.body
        let usuario = await usuariosService.getUsuarioById(usuarioId);


        //PEDIDO: [{id:2, cantidad:3},{id:5, cantidad:4}]
        let error = false
        let total = 0


        for (let item of pedido) {

            let producto = await productosService.getProductoById(item.id)
            if (!producto) {
                console.log(`El producto con id ${item.id} no existe`);
                error = true;
                break;
            }

            item.descripcion = producto.descripcion
            item.precio = producto.precio
            item.subtotal = producto.precio * item.cantidad

            total += producto.precio * item.cantidad
        };

        if (error) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(500).json({ error: `Error al agregar producto al carrito` })

        }

        console.log(pedido);

        let numero = Date.now()

        let nuevoCarrito = await carritosService.createCarrito({
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

    static async agregarProductoCarrito(req, res) {
        try {
            const { productoId, cantidad } = req.body;

            console.log("id de producto:", productoId);
            if (!req.isAuthenticated()) {
                return res.status(401).json({ error: 'Para poder comprar debes iniciar sesión.' });
            }

            const userId = req.session.usuario.id;
            console.log("id de usuario:", userId);
            let carrito = await carritosService.getCarritoByUser(userId);

            if (!carrito) {
                carrito = await carritosService.createCarrito({ usuario: userId, productos: [] })
            }

            let producto = await productosService.getProductoById(productoId)

            console.log(" Producto:", producto);
            if (!producto) {
                console.log(`El producto con id ${productoId} no existe`);
            }

            const nombre = producto.nombre
            const descripcion = producto.descripcion
            const precio = producto.precio
            const cantidadNum = parseInt(cantidad);
            const subtotal = producto.precio * cantidad

         // Verificar si el producto ya está en el carrito
        const index = carrito.productos.findIndex(item => item.productoId === productoId);

        if (index !== -1) {
            // Si el producto ya está en el carrito, sumarle la cantidad
            carrito.productos[index].cantidad = parseInt(carrito.productos[index].cantidad) + cantidadNum;
            carrito.productos[index].subtotal += subtotal;
        } else {
            // Si el producto no está en el carrito, agregarlo
            carrito.productos.push({ productoId, nombre, descripcion, precio, cantidad: cantidadNum, subtotal });
        }

            // Calcular el total del carrito
            const total = carrito.productos.reduce((acc, curr) => acc + curr.subtotal, 0);

            // Actualizar el total del carrito
            carrito.total = total;

            console.log(carrito.productos);

            await carritosService.updateCarrito(userId, carrito);

            return res.status(200).json({ message: 'Producto agregado al carrito' })




        } catch (error) {
            console.log('Error al agregar el producto al carrito', error);
            return res.status(500).json({ error: 'Error interno del servidor al agregar producto al carrito' });
        }
    }


}