import { carritosModelo } from "./models/carritos.model.js";

export class CarritoMongoDAO {
    constructor() { }

    async get() {
        try {
            return await carritosModelo.find()
        } catch (error) {
            console.log(error.message);
            return null
        }
    }

    async getBy(id) {
        try {
            return carrito = await carritosModelo.findOne({ _id: id })
        } catch (error) {
            console.log(error.message);
            return null
        }
    }

    async create(carrito) {
        try {
            return await carritosModelo.create(carrito)
        } catch (error) {
            console.log(error.message);
            return null
        }

    }

    async update(id, carrito) {
        try {
            return await carritosModelo.updateOne({ _id: id, carrito })

        } catch (error) {
            console.log(error.message);
            return null
        }
    }


}