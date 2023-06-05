import {Router} from 'express'
import { miAlquiler, verAlquiler } from '../controllers/alquiler.controllers.js'
import { cancelarAlquiler } from '../controllers/casas.controllers.js'

const router = Router()

router.get("/alquiladas", verAlquiler)
router.get("/alquiladas/:id", miAlquiler)
router.put("/cancelar/:id",cancelarAlquiler)

export default router