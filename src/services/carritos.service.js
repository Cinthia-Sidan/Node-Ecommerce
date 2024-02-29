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

    async createCarrito(carrito){
        return await this.dao.create(carrito)
    }

   
}

export const carritosService = new CarritosService(DAO)