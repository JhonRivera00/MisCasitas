import { useEffect, useState } from "react"
import { cancelarCa, mialquiler, verUsuario } from "../../data/data"
import Swal from "sweetalert2"

function Alquiler() {
const [misCasas, setMisCasas] = useState([])
console.log(misCasas)

    useEffect(() => {
        (async()=>{
    const id = await  verUsuario()
        const misCasas = await mialquiler(id._id)
        setMisCasas(misCasas)
    })()
    }, [])
    const cancelarCasa = (id)=>{
        Swal.fire({
            icon:"question",
            title:"Seguro deseas cancelar?",
            text:"Si cancelas el alquiler sera retenido un 30% de tu dinero por haber cancelado tu alquiler",
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Si',
            cancelButtonText:"No"
        }).then((result)=>{
          if(result.isConfirmed){
              cancelarCa(id)
            
          }
        })
      
    }
  return (
    <div className="container-fluid">
      <div className="row d-flex flex-wrap p-5">{!misCasas ?<h1>No tienes casas alquiladas</h1>:
misCasas.map(({_id,casaId})=>(
  
  <div key={casaId._id} className="card ms-5 mt-5" style={{ width: "18rem" }}>
  
  <div className="card-body">
  <h5 className="card-title">{casaId.tipo_casa}</h5>
  <p className="card-text">{casaId.descripcion}</p>
  </div>
  <ul className="list-group list-group-flush">
  <li className="list-group-item">Direccion: {casaId.direccion}</li>
  <li className="list-group-item">Numero de pisos: {casaId.num_pisos}</li>
  <li className="list-group-item">Medidas:</li>
  <li className="list-group-item">Largo {casaId.medidas.largo}</li>
  <li className="list-group-item">ancho {casaId.medidas.ancho}</li>
  <li className="list-group-item">Precio mensual:{casaId.costo}</li>
  <li className="list-group-item">Maximo de personas: {casaId.capacida_max_personas}</li>
  </ul>
  <div className="card-body">
  <button href="#" className="btn btn-primary" onClick={()=>cancelarCasa(_id)}>Cancelar</button>
  </div>
  </div>
  ))
}
      </div>

    </div>
  )
}

export default Alquiler
