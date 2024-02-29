import { cartModel } from "./models/carritos.model.js";

export class CarritoMongoDAO{
    async get(){
        return cartModel.find()
    }

    async getBy(id){
        return carrito= await cartModel.findOne({_id: id})
    }

    async create(carrito){
        return await cartModel.create(carrito)
    }

   
}