import { productModel } from "./models/productos.model.js";



export class ProductosMongoDAO{
   
    async get(){
        return productModel.find()
    }

    async getBy(id){
        let producto
        return producto= await productModel.findOne({_id: id})
    }

    async create(producto){
        return await productModel.create(producto)
    }

    async update(pid, productToReplace){
        return await productModel.updateOne({ _id: pid }, productToReplace)
    }
}

