import Alquiler from '../models/alquiler.model.js'

export const verAlquiler = async (req,res)=>{
    try {
        const casas = await Alquiler.find().populate("usuarioId casaId")
        res.status(200).json(casas)
    } catch (error) {
        console.log(error)
        res.status(400).json("Error en el servidor")
    }
}
export const miAlquiler = async (req, res) => {
    try {
      const { id } = req.params;
      const alquiladas = await Alquiler.find({ usuarioId: id }).populate("usuarioId casaId");
      const casas = alquiladas.filter(alquiler => alquiler.casaId.estado === "alquilada" && alquiler.estado===true);
      if (casas.length === 0) {
        return res.status(400).json("No tienes casas alquiladas");
      }
  
      res.status(200).json(casas);
    } catch (error) {
      console.log(error);
      res.status(500).json("Error en el servidor");
    }
  };
  
  
