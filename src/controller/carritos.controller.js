import { carritosService } from "../services/carritos.service.js";

export class CarritosController{
    constructor(){}

    static async getCarritos(req, res){
        let carritos = await carritosService.getCarritos()

        res.setHeader('Content-Type','application/json')
        res.status(200).json({carritos})
    }

    static async createCarrito(req,res){
        try {
            const carrito = req.body; // Suponiendo que el body contiene los datos del carrito a crear
            const nuevoCarrito = await carritosService.createCarrito(carrito);
            res.status(201).json({ carrito: nuevoCarrito });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}