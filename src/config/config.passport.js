import passport from 'passport'
import local from 'passport-local'
import { usuariosModelo } from '../DAO/models/usuarios.model.js'
import { creaHash, validaPassword } from '../utils.js'

export const inicializarPassport = () => {

    passport.use('registro', new local.Strategy(
        {
            passReqToCallback: true, usernameField: 'email'
        },
        async (req, username, password, done) => {
            try {

                let { nombre, email} = req.body

                if (!nombre || !email || !password) {
                   // return res.redirect('/registro?error=Complete todos los datos')
                    return done(null, false) // como no hay error mandamos un null y como no hay usuario porque se comprueba que llego vacio se envia false
                }

                let existe = await usuariosModelo.findOne({ email })

                if (existe) {
                    //return res.redirect('/registro?error=Ya existe un usuario con ese email')
                    return done(null, false)
                }

                //password = crypto.createHmac("sha256", "coder123").update(password).digest("hex");

                password = creaHash(password);

                let usuario
                try {
                    usuario = await usuariosModelo.create({ nombre, email, password })
                    //res.redirect(`/login?mensaje=Usuario ${email} registrado correctamente`)
                    return done(null, usuario)
                    //previo a devolver usuario con done, passort guarda user con los datos del usuario
                } catch (error) {
                    //res.redirect('/registro?error=Error inesperado. Reintente en unos minutos')
                    return done(null, false)
                }



            }
            catch (error) {
              return  done(error)
            }
        }
    ))


    passport.use('login', new local.Strategy(
        {
            usernameField: 'email'
        },
        async (username, password, done)=>{
            try{

                if (!username || !password) {
                    //return res.redirect('/login?error=Complete todos los datos')
                    return done(null, false)
                }
            
                //password = crypto.createHmac("sha256", "coder123").update(password).digest("hex");
            
            
                let usuario = await usuariosModelo.findOne({ email:username})
                if (!usuario) {
                    //return res.redirect('/login?error=Credenciales incorrectas')
                    return done(null, false)
                }
                if (!validaPassword(usuario, password)) {
                    //return res.redirect('/login?error=Credenciales incorrectas')
                    return done(null, false)
                }

                return done(null, usuario)
                //previo a devolver usuario con done, passort guarda user con los datos del usuario
             
            }
            catch(error){
                return done(null, false)
            }
        }
    ))


    //configurar serializador y deserializador
    passport.serializeUser((usuario, done)=>{
        return done(null, usuario._id)
    })

    passport.deserializeUser(async(id, done)=>{
        let usuario =await usuariosModelo.findById(id)
        return done(null, usuario)
    })

}//fin de inicializarPassport