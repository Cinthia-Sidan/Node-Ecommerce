import {fakerES_MX as faker} from '@faker-js/faker'


export const generaUsuario=()=>{
    let nombre = faker.person.firstName();
    let email = faker.internet.email({firstName:nombre});
    let password =faker.internet.password({length:5, memorable:true});
    let edad = faker.number.int({min:15, max:100})

    return{
        nombre, email, password, edad
    }
}

export const cargaProducto=()=>{
    let nombre = faker.commerce.productName();
    let descripcion = faker.commerce.productDescription();
    let stock = faker.number.int({min:1, max:1000});
    let precio = faker.commerce.float({ min: 800, max: 2000000, fractionDigits: 2 })

    return{
        nombre, descripcion, stock, precio
    }
}

export const generaProducto=()=>{
    let nombre = faker.commerce.product();
    let descripcion = faker.commerce.productDescription();
    let cantidad = faker.number.int({min:1, max:20});
    let precio = faker.commerce.price({ min: 1000, max: 2000000, dec: 2, symbol: '$' })
    let subtotal = cantidad*Number(precio.slice(1))

    return{
        nombre, descripcion, cantidad, precio, subtotal
    }
}

export const generaCompra=()=>{
    let nroTicket="00"+faker.string.numeric(2)+"-0000"+faker.string.numeric(4);
    let fecha= faker.date.recent({days:30})
    let cliente= generaUsuario()
    let carrito=[]
    let total=0
    for(let i=0; i<faker.number.int({min:1, max:15}); i++){
        let producto= generaProducto()
        total+=producto.subtotal
        carrito.push(producto)

    }

    return{
        nroTicket, fecha, cliente, carrito, total
    }
}