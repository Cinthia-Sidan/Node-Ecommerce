import { carritosModelo } from "./models/carritos.model.js";

export class CarritoMongoDAO {
    constructor() { }

    async get() {
        try {
            return await carritosModelo.find().populate("usuario").lean()
        } catch (error) {
            console.log(error.message);
            return null
        }
    }

    async getBy(id){
        let carrito
        return carrito= await carritosModelo.findOne({_id: id})
    }

    async getByUser(id){
        try{
            let carrito
            return carrito = await carritosModelo.findOne({usuario: id})
        
        }catch (error){
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
            return await carritosModelo.findOneAndUpdate({ usuario: id }, carrito, { new: true });
        } catch (error) {
            console.log(error.message);
            return null;
        }
    }


}