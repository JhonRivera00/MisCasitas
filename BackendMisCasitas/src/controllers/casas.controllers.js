import Casas from '../models/casas.model.js'
import Alquiler from '../models/alquiler.model.js'

export const crearCasa = async (req, res) => {
    try {
        const { tipo_casa, direccion, costo, medidas, num_pisos, descripcion, capacida_max_personas, estado } = req.body
        if (!tipo_casa || !direccion || !costo || !medidas || !num_pisos || !descripcion || !capacida_max_personas || !estado) {
            return res.status(400).json("Se requieren todos los datos")
        } else {
            const direccionExiste = await Casas.findOne({direccion:direccion})
            if(direccionExiste){
                return res.status(400).json("Direccion de casa ya registrada")
            }else{ 
                const casa = new Casas(req.body)
                await casa.save()
                res.status(200).json("Casa creada exitosamente")
            }

        }
    } catch (error) {
        console.log(error)
        res.status(400).json("Error en el Servidor")
    }
}
export const alquilarCasa = async (req, res) => {
    try {
        const { casaId, usuarioId } = req.body
        if (!casaId || !usuarioId) {
            return res.status(400).json("Se requiren los datos")
        } else {

            const alquilada = new Alquiler(req.body)
            const alquiler = await Casas.findByIdAndUpdate(casaId, {
                estado: "alquilada"
            })
            await alquilada.save();
            if (alquiler) {
                return res.status(200).json("Casa alquilada")
            } else {
                return res.status(400).json("No se pudo actualizar la casa")
            }
        }

    } catch (error) {
        console.log(error)
        res.status(400).json("Error en el servidor")
    }
}
export const verCasas = async (req, res) => {
    try {
        const alquiler = await Casas.find()

        res.status(200).json(alquiler)


    } catch (error) {
        console.log(error)
        res.status(400).json("Error en el servidor")
    }
}
export const verCasa = async (req, res) => {
    try {
        const{_id}=req.params
        const alquiler = await Casas.findById(_id)

        res.status(200).json(alquiler)


    } catch (error) {
        console.log(error)
        res.status(400).json("Error en el servidor")
    }
}
export const eliminarCasa = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Casas.findByIdAndDelete (id)
        if (!data) {
            return res.status(400).json("No se Pudo Eliminar el usuario")
        }
        res.status(200).json("Usuario Eliminado Correctamente")
    } catch (error) {
        console.log(error)
        res.status(500).json("Error en el Servidor" + error)
    }
}   
export const actualizarCasa = async (req,res)=>{
    try {
        const {_id}=req.params
        if(!_id){
            return res.status(400).json("Se requiere un usuario")
        }else{
            const updateCasa = await Casas.findByIdAndUpdate(_id,req.body)
            if(updateCasa){
                return res.status(200).json("Casa actualizada")
            }else{
                res.status(400).json("No se pudo actualizar la casa")
            }
        }

    } catch (error) {
        console.log(error)
        res.status(500).json("Error en el Servidor" + error)
    }
}
export const activarCasa = async (req, res) => {
    try {
      const { _id } = req.params;
      const casa = await Casas.findById(_id);
      
      if (!casa) {
        return res.status(404).json("No se encontró la casa");
      }
  
      const nuevoEstado = casa.estado === "disponible" ? "desactivada" : "disponible";
      casa.estado = nuevoEstado;
      await casa.save();
  
      if (nuevoEstado === "disponible") {
        return res.status(200).json("Casa activada");
      } else {
        return res.status(200).json("Casa desactivada");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Error en el servidor: " + error);
    }
  };

  export const cancelarAlquiler = async (req,res)=>{
    try {
        const {id}=req.params
      
        const casa = await Alquiler.findById(id).populate("casaId")
        await Alquiler.findByIdAndUpdate({_id:id},{estado:false})
        await Casas.findByIdAndUpdate({_id:casa.casaId._id},{estado:"disponible"})
        
        
        res.status(200).json("Cancelado")
    } catch (error) {
        console.log(error);
      return res.status(500).json("Error en el servidor: " + error);
    }
  }
  