import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import { router as usuariosRouter} from './routes/usuarios.router.js';
import { router as vistasRouter } from './routes/vistas.router.js';


const PORT=3000;

const app=express();

//Configuramos handlebars
app.engine('handlebars', engine({
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
//app.engine('handlebars', engine());
app.set('view engine','handlebars');
app.set('views', path.join(__dirname, 'views'));

//Parsea la información de req en el body y tomarla como json
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//carpeta de rutas estaticas
app.use(express.static(path.join(__dirname, '/public')));


app.use('/',vistasRouter);

app.use('/api/usuarios',usuariosRouter)

//Levanto el servidor
const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});


//Conecto a la Base de datos
try{
    await mongoose.connect('mongodb+srv://sidancin22:sidan120722@cluster0.kmhvl3s.mongodb.net/?retryWrites=true&w=majority',{dbName: 'coder10'});
    console.log('DB Online');
}
catch(error){
    console.log(error.message);
}