import dotenv from 'dotenv'
import { Command } from 'commander'

const program=new Command()

program
    .option("-m, --mode <mode>", "Modo de ejecución del script (prod/dev)", "dev")

program.parse()

let opts=program.opts()
let modosPerm=["prod","dev"]
if(!modosPerm.includes(opts.mode.toLowerCase())){
    console.log("Solo dev y prod son los modos permitidos");
    process.exit()
}


const mode=opts.mode;

//Se ejecuta con npm start --mode dev para uno o npm start --mode prod para el otro


dotenv.config(
    {
        override: true,
        path:mode==="dev"?"./src/.env.development":"./src/.env.production"
    }
)

export const config={
    PORT:process.env.PORT||8080,
    PRUEBA_PORT:process.env.PRUEBA_PORT,
    MONGO_URL:process.env.MONGO_URL,
    DBNAME:process.env.DBNAME

}
