import {Router} from 'express'
import { activarCasa, actualizarCasa, alquilarCasa, crearCasa, eliminarCasa, verCasa, verCasas } from '../controllers/casas.controllers.js';

const router = Router();

router.post("/casa",crearCasa)
router.post("/alquilarcasa",alquilarCasa)
router.get("/casa",verCasas)
router.get("/casa/:_id",verCasa)
router.delete("/casa/:id",eliminarCasa)
router.put("/actualizarCasa/:_id",actualizarCasa)
router.put("/activarCasa/:_id",activarCasa)

export default router