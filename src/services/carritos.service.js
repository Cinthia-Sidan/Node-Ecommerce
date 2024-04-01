import { CarritoMongoDAO as DAO } from "../DAO/carritosMongoDAO.js";

class CarritosService{
    constructor(dao){
        this.dao= new dao()
    }

    async getCarritos(){
        return await this.dao.get()
    }

    async getCarritoById(id){
        return await this.dao.getBy(id)
    }

    async getCarritoByUser(id){
        return await this.dao.getByUser(id)
    }

    async createCarrito(carrito){
        return await this.dao.create(carrito)
    }

    async updateCarrito(id, carrito){
        return await this.dao.update(id, carrito)
    }

   
}

export const carritosService = new CarritosService(DAO)