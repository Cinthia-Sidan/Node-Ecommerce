import { Router } from "express";

export class MiRouter{
    constructor(){
        this.router = Router()
         this.init()
    }

    init(){}

    getRouter(){
        return this.router
    }

    get(ruta, ...funciones){ //operador rest que almacenan argumentos del array funciones
        this.router.get(ruta, funciones)
    }
}