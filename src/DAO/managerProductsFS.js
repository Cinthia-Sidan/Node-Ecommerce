const fs = require('fs');

class Contenedor {
    constructor(file) {
        this.file = file
    }


    async save(objeto) {
        try {
            const objects = await this.getAllObjects()
            const timestamp = Date.now();
            const nombre = objeto.name;
            objeto.id = timestamp + nombre.replace(/\s+/g, '');
            objects.push(objeto)
            await this.saveObjects(objects)
        }
        catch (error) {
            console.log(error);
            throw new Error('Error al guardar el objeto')

        }
    }

    async getById(id) {
        try {

            const objects = await this.getAllObjects()
            const searchObj = objects.find((o) => o.id === id)
            return searchObj || null
        }
        catch (error) {
            throw new Error('Error al buscar objeto por id')
        }
    }

    async updateById(objeto, id) {
        try {
            const objects = await this.getAllObjects();
            const productIndex = objects.findIndex((producto) => producto.id === id);

            if (productIndex === -1) {
                return null;
            }

            objects[productIndex] = {
                ...objects[productIndex],
                ...objeto
            };

            await this.saveObjects(objects);
            return objects[productIndex];

        }
        catch (error) {
            throw new Error('Error al actualizar objeto por id')
        }
    }


    async deleteById(id) {
        try {
            let objects = await this.getAllObjects()
            objects = objects.filter((o) => o.id !== id)
            await this.saveObjects(objects)
        }
        catch (error) {
            throw new Error("Error al eliminar los objetos")
        }
    }


    async deleteAll() {
        try {
            await this.saveObjects([])
        }
        catch (error) {
            throw new Error("Error al eliminar todos los objetos")
        }
    }


    async getAllObjects() {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8')
            return data ? JSON.parse(data) : []
        } catch (error) {
            return []
        }
    }

    async saveObjects(objects) {
        try {
            await fs.promises.writeFile(this.file, JSON.stringify(objects, null, 2))
        }
        catch (error) {
            throw new Error(" Error al guardar objeto")
        }
    }


}




/*
const main = async () =>{
    

    //Funcion para guardar un objeto
    const id = await productos.save(
        {title: 'Producto', price: 1000}
    )
    console.log('Objeto guardado con ID:', id)

    //Funcion para traer todos los productos
    const allObjects = await productos.getAll()
    console.log('Ubjetos guardados', allObjects)

    //Eliminar un objeto
    await productos.deleteById(1)
    console.log("Objeto eliminado")

    //Obtener objeto por ID
    const obj = await productos.getById(1)
    console.log("Objeto obtenido", obj)
    
}

main().catch((error)=>console.error(error))
const productos = new Contenedor("productos.json")
*/


module.exports = Contenedor;

