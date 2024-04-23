export const errorHandler=(error, req, res, next)=>{
    if(error){
        if(error.codigo){

            console.log(`Error código ${error.codigoInterno} - ${error.name}: ${error.message}. Detalle: ${error.descripcion}`);

            res.setHeader('Content-Type', 'application/json');
            return res.status(error.codigo).json({error:`${error.name}: ${error.message}`})
        }else{
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({error:`Error inesperado en el servidor. Contacte a un administrador.`})
        }
    }
}