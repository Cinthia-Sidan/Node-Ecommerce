import { Router } from "express";
import { upload } from "../utils.js";
import { enviarMail } from "../mail.js";
import fs from 'fs'

export const router = Router();

//Para el envío de mails con adjuntos utilizo multer, con la funcion upload que defini en utils. La llamo como un array porque son multiples con el nombre adjuntos (que es el name del form) y aclaro el numero máximo de archivos(es opcional)
router.post('/', upload.array("adjuntos"), async (req, res) => {
    let { to, subject, message } = req.body

    let adjuntos = [];
    req.files.forEach(archivo => {
        adjuntos.push({
            path: archivo.path,
            filename: archivo.originalname
        })
    })

    let resultado

    try {
        resultado =await enviarMail(to, subject, message, adjuntos)

        setTimeout(() =>{
            req.files.forEach(a=>{
                fs.unlinkSync(a.path)
            })
            console.log("Archivos eliminados del server");
        }, 3000);
        
        if (resultado.accepted.length>0) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ payload: "Mail enviado correctamente" })
        } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({ error: `Error en el servidor` })

        }
    }
    catch (error) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ error: `Error en el servidor` })
    }



})