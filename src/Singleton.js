import mongoose from "mongoose";

class Singleton{
    //el # indica que una variable es privada
    static #instancia
    constructor(url){
        mongoose.connect(url)

    }

    static conectarDB(url){
        //compruebo que no este hecha la conexion a la BD
        if(this.#instancia){
            console.log(`La conexión ya fue establecida previamente`);
            return this.#instancia
        }
        //En caso de que no haya una conexión se ejecuta el constructor
        this.#instancia= new Singleton(url)
        console.log(`DB Online`);
        return this.#instancia
    }
}

//Singleton.conectarDB("mongodb+srv://sidancin22:sidan120722@cluster0.kmhvl3s.mongodb.net/?retryWrites=true&w=majority&dbName=coder20")