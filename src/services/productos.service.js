import { ProductosMongoDAO as DAO} from "../DAO/productosMongoDAO.js"


class ProductosService{
    constructor(dao){
        this.dao=new dao()
    }

    async getProductos(){
        return await this.dao.get()
    }

    async getProductoById(id){
        return await this.dao.getBy(id)
    }

    async createProducto(producto){
        return await this.dao.create(producto)
    }

    async updateProducto(pid, productToReplace) {
        return await this.dao.update(pid, productToReplace)
    }

    async deleteProducto(id){
        return await this.dao.delete(id)
    }
}

export const productosService = new ProductosService(DAO)