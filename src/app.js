import __dirname from './utils.js';
import { config } from './config/config.js';
import sessions from 'express-session';
import mongoStore from 'connect-mongo';
import path from 'path';
import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import { router as usuariosRouter } from './routes/usuarios.router.js';
import { router as vistasRouter } from './routes/vistas.router.js';
import { router as sessionRouter } from './routes/session.router.js';
import {router as productosRouter} from './routes/productos.router.js';
import {router as carritosRouter } from './routes/carritos.router.js';


import { inicializarPassport } from './config/config.passport.js';
import passport from 'passport';
//const PORT = 3000;
const PORT =config.PORT;

console.log("PRUEBA PORT:", config.PRUEBA_PORT);

const app = express();

//Configuramos handlebars
app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
//app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//Parsea la información de req en el body y tomarla como json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//uso de session
app.use(sessions({
    secret: "coder123",
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create(
        {
            mongoUrl: 'mongodb+srv://sidancin22:sidan120722@cluster0.kmhvl3s.mongodb.net/?retryWrites=true&w=majority',
            mongoOptions: { dbName: 'coder20' },
            ttl: 3600
        }
    )
}))

//passport paso 2
inicializarPassport()

app.use(passport.initialize())
app.use(passport.session())

//carpeta de rutas estaticas
app.use(express.static(path.join(__dirname, '/public')));


app.use('/', vistasRouter);
app.use('/api/session', sessionRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/productos', productosRouter);
app.use('/api/carritos', carritosRouter);

//Levanto el servidor
const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});


//Conecto a la Base de datos
//try {
//    await mongoose.connect('mongodb+srv://sidancin22:sidan120722@cluster0.kmhvl3s.mongodb.net/?retryWrites=true&w=majority', { dbName: 'coder20' });
//    console.log('DB Online');
//}
//catch (error) {
//    console.log(error.message);
//}

try {
    await mongoose.connect(config.MONGO_URL, { dbName: config.DBNAME  });
    console.log('DB Online');
}
catch (error) {
    console.log(error.message);
}