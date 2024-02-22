import { Router } from "express";
export const router=Router()

   router.get('/:numero([0-9]+)', (req, res)=>{
    let {numero}= req.params
    numero=Number(numero)
    console.log(numero, typeof(numero));

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({numero})
   })


   router.get('/:palabra([a-zA-Z]+)', (req, res)=>{
    let {palabra}= req.params
    

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({palabra})
   })

   router.get('*', (req, res)=>{

    res.setHeader('Content-Type', 'application/json')
    res.status(404).json({error: "Page not found"})
   })

   router.get('/error/:nombre/:codigo', (req, res)=>{
    let {nombre, codigo}= req.params
    let mensaje="Error desconocido"
    if(errores[codigo]){
        mensaje=errores[codigo]
    }
    

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({palabra})
   })