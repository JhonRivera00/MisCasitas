import {Router} from 'express'
import { crearUsuario, loginUsuario, updateUsuario, verUsuario, verUsuarios } from '../controllers/usuarios.controllers.js';
import multer from 'multer'
import path from 'path'
import { verifyToken } from '../middleware/exptoken.js';

const router = Router();
const storage = multer.diskStorage({
    destination: "./imagen",
    filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
  });
  
const upload = multer({
    storage:storage
})

router.get("/usuario", verUsuarios)
router.get("/usuario/:id", verUsuario)
router.post("/usuario",upload.single("foto_perfil"), crearUsuario)
router.post("/loginUsuario",loginUsuario)
router.put("/actualizarUsuario/:_id",upload.single("foto_perfil") ,updateUsuario)
router.post("/token",verifyToken)
export default router;