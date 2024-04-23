export const errorArgumentos=(usuario)=>{
    let {name, ...otros}=usuario

    return `
    Error en argumentos: 
    Argumentos obligatorios:
        -name: esperado tipo string, recibido ${usuario.name}
    Argumentos opcionales:
        -alias ${JSON.stringify(otros)} 

    Fechas: ${new Date().toUTCString()}
    `
}