import { productosService } from "../services/productos.service.js";

export class ProductosController{
    constructor(){}

    static async getProductos(req, res){
        let productos = await productosService.getProductos()

        if (!productos) {
            res.setHeader('Content-Type', 'application/json')
            res.status(500).json({ error: `Error inesperado en el servidor` })
        } else {
            res.setHeader('Content-Type','text/html')
            res.status(200).render("home",{ productos })
        }
    }

    static async listarProductos(req, res) {
        try {
            return await productosService.getProductos()
        } catch (error) {
            console.log(error);
            return null
        }
    }

    static async getProductoById(req, res){
        let producto = await productosService.getProductoById(req.params.pid)

        if (!producto) {
            res.setHeader('Content-Type', 'application/json')
            res.status(500).json({ error: `Error inesperado en el servidor` })
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json({ producto })
        }
    }

    static async createProducto(req,res){
        let {nombre, stock, precio, descripcion}=req.body

        if(!nombre || !stock || !precio || !descripcion){
            //res.setHeader('Content-Type','application/json');
            //return res.status(400).json({error:`Complete los datos`})
            res.setHeader('Content-Type', 'text/html')
            res.redirect(`/cargar-productos?error=Complete los datos`);

        }

        let nuevoProducto= await productosService.createProducto({nombre, stock, precio, descripcion})

        //res.setHeader('Content-Type','application/json')
        //res.status(200).json({nuevoProducto})
        res.setHeader('Content-Type', 'text/html')
        res.redirect(`/cargar-productos?mensaje=Producto ${nuevoProducto.nombre} registrado correctamente`);

    }

    static async updateProducto(req,res){
        let { pid } = req.params

    let productToReplace = req.body

    if (!productToReplace.nombre || !productToReplace.stock || !productToReplace.precio || !productToReplace.descripcion) {
        res.send({ status: "error", error: "Faltan campos obligatorios" })
    }

    let result = await productosService.updateProducto({ _id: pid }, productToReplace)
    res.send({ result: "success", payload: result })
    }
}