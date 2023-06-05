import express from 'express'
import cors from 'cors'
import morgan  from 'morgan'
import {createRoles} from './inicialRol/inicialSetup.js'
import Usuario from './routes/usuario.routes.js'
import Casas from './routes/casa.routes.js'
import Alquiler from './routes/alquiladas.routes.js'
const app = express()
// createRoles()
app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("imagen"))
app.use(Usuario)
app.use(Casas)
app.use(Alquiler)
export default app;