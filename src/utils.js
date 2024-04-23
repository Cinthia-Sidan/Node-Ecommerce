import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import multer from 'multer';
import winston from 'winston';
import { config } from './config/config.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const creaHash=(password)=>bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validaPassword=(usuario, password)=>bcrypt.compareSync(password, usuario.password)

//utilizo diskStorage para el envío de archivos en el mail. El mismo me permite controlar el lugar a almacenar y el nombre del archivo.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/uploads')
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      //cb(null, file.fieldname + '-' + uniqueSuffix)
      //quiero que el nombre del archivo sea el nombre original
        cb(null, file.originalname)
    }
  })
  

export const upload = multer({ storage: storage })


const logger = winston.createLogger(
  {
    transports: [
      new winston.transports.File(
        {
          level:"error",
          filename: "./src/logs/errorLogs.log",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          )
        }
      ),

      new winston.transports.File(
        {
          level:"warn",
          filename: "./src/logs/warningLogs.log",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          )
        }
      )
    ]
  }
)

const transporteConsola= new winston.transports.Console(
  {
    level: "silly",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }
)

if(config.MODE === "dev"){
  logger.add(transporteConsola)
}

export const middLogg=(req, res, next)=>{
  req.logger=logger

  next()
}
