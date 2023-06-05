import { useEffect, useState } from "react"
import { alquilarCasas, verCasasDisponibles, verUsuario } from "../../data/data"

function Casas() {
  const [casas, setCasas] = useState([])
console.log(casas)
  useEffect(() => {
    (async()=>{
      const dataCasa = await verCasasDisponibles()
      const casa_Disponible = dataCasa.filter(item => item.estado === "disponible");

      setCasas(casa_Disponible)
    })()
  }, [])
  const alquilarCasa =async (id)=>{
    const usuario =await verUsuario()
    const usuarioId = usuario._id
    const casaId = id
    const data ={ 
      usuarioId,casaId
    }
    alquilarCasas(data)
  }
  
  return (  
    <div className="container-fluid">
      <div className="row d-flex flex-wrap p-5">
{casas.map((casas)=>(
  
        <div key={casas._id} className="card ms-5 mt-5" style={{ width: "18rem" }}>
         
          <div className="card-body">
            <h5 className="card-title">{casas.tipo_casa}</h5>
            <p className="card-text">{casas.descripcion}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Direccion: {casas.direccion}</li>
            <li className="list-group-item">Numero de pisos: {casas.num_pisos}</li>
            <li className="list-group-item">Medidas:</li>
            <li className="list-group-item">Largo {casas.medidas.largo}</li>
            <li className="list-group-item">ancho {casas.medidas.ancho}</li>
            <li className="list-group-item">Precio mensual:{casas.costo}</li>
            <li className="list-group-item">Maximo de personas: {casas.capacida_max_personas}</li>
          </ul>
          <div className="card-body">
            <button href="#" className="btn btn-primary" onClick={()=>alquilarCasa(casas._id)}>Alquilar</button>
          </div>
        </div>
 ))}
      </div>

    </div>
    
  )
}

export default Casas
