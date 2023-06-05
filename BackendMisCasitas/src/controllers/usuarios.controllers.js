import Roles from "../models/roles.models.js";
import Usuarios from "../models/usuarios.models.js";
import { JWT_SECRET } from "../config.js";
import Jwt from "jsonwebtoken";

export const verUsuarios = async (req, res) => {
  try {
    const usuario = await Usuarios.find();
    return res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error en el Servidor");
  }
};

export const verUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Usuarios.findById(id);
    if (!data) {
      return res.status(400).json("No se pudo traer el usuario");
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Error en el Servidor");
  }
};
export const crearUsuario = async (req, res) => {
  try {
    console.log(req.body);
    const {
      nombre,
      apellido,
      fecha_nacimiento,
      identificacion,
      usuario,
      contrasena,
      rol,
    } = req.body;
    if (
      !nombre ||
      !apellido ||
      !fecha_nacimiento ||
      !identificacion ||
      !usuario ||
      !contrasena
    ) {
      return res.status(400).json("Se requiren todos los campos");
    } else {
      const usuarioExiste = await Usuarios.findOne({ usuario: usuario });
      if (usuarioExiste) {
        return res.status(400).json("Nombre de usuario ya existe");
      } else {
        console.log(req.file);
        const crearUsuario = new Usuarios(req.body);

        crearUsuario.foto_perfil = req.file.filename;
        crearUsuario.contrasena = await crearUsuario.encrypt(contrasena);

        if (rol) {
          const foundRol = await Roles.findOne({ nombre: { $in: rol } });
          crearUsuario.rol = foundRol._id;
        } else {
          const defaultRol = await Roles.findOne({ nombre: "cliente" });
          crearUsuario.rol = defaultRol._id;
        }
        await crearUsuario.save();

        res.status(200).json("Usuario Registrado Exitosamente");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Error en el Servidor");
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { _id } = req.params;
    const {nombre, apellido,fecha_nacimiento} = req.body;
    if(req.file){
      const foto=req.file.filename
      const data = await Usuarios.findByIdAndUpdate(_id, {nombre,apellido,fecha_nacimiento, foto_perfil:foto});
      if (!data) {
          return res.status(400).json("No se Pudo Actualizar el usuario");
        }
        res.status(200).json("Usuario Actualizado Correctamente");}

    else{
        const data = await Usuarios.findByIdAndUpdate(_id, {nombre,apellido,fecha_nacimiento});

        if (!data) {
          return res.status(400).json("No se Pudo Actualizar el usuario");
        }
        res.status(200).json("Usuario Actualizado Correctamente");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Error en el Servidor" + error);
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;
    if (usuario && contrasena) {
      const data = await Usuarios.findOne({ usuario }).populate("rol");
      if (!data) {
        return res.status(400).json("Usuario No Existe");
      } else {
        const contra = await Usuarios.comparePassword(
          contrasena,
          data.contrasena
        );
        if (!contra) {
          return res.status(400).json("Contraseña Incorrecta");
        } else {
          const token = Jwt.sign(
            { id: data._id, rol: data.rol.nombre },
            JWT_SECRET,
            {
              expiresIn: 60 * 60,
            }
          );

          res.status(200).json({
            token,
            nombre: data.nombre,
            message: "Login Correcto",
          });
        }
      }
    } else {
      res.status(500).json("Complete Todos Los Campos");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Error en el Servidor" + error);
  }
};

