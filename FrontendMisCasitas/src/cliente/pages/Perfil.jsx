import { useEffect, useState } from "react"
import { actualizarUser, verUsuario } from "../../data/data"

function Perfil() {
const [fotoPerfil, setFotoPerfil] = useState("")
const [data, setData] = useState({})


useEffect(() => {
    (async()=>{
        const data = await verUsuario()
        setData(data)
    })()
}, [])


const handleSubmit =async (e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append("nombre",data.nombre)
    formData.append("apellido",data.apellido)
    formData.append("fecha_nacimiento",data.fecha_nacimiento)
    formData.append("foto_perfil",fotoPerfil)
    
    actualizarUser(data._id,formData)
    
}
const handleTarget = ({target})=>{
    setData({...data,[target.name]:target.value })
    
}

  return (
    <div>
   
      
      <div className="container-sm pt-5 d-flex justify-content-center" >
        <div className="w-50" >
            <div className="">
                   
                    <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="d-flex w-100 d-flex justify-content-center">

                  <img className="shadow-lg m-5 rounded-pill" src={`http://localhost:3001/${data.foto_perfil}`}></img>
                  </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control" name="nombre" value={data.nombre}  onChange={handleTarget} placeholder=""/>
                      <label htmlFor="">Nombre</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control" name="apellido" value={data.apellido}   onChange={handleTarget} placeholder=""/>
                      <label htmlFor="">Apellido</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="date" className="form-control" name="fecha_nacimiento" value={data.fecha_nacimiento}  onChange={handleTarget} id="" placeholder=""/>
                      <label htmlFor="">Fecha Nacimiento</label>
                    </div>                     
                   <div className="mb-3">
                     <label htmlFor="" className="form-label">Foto Perfil</label>
                     <input type="file" className="form-control" name="foto_perfil" onChange={(e)=>setFotoPerfil(e.target.files[0])} id="" placeholder="" aria-describedby="fileHelpId"/>
                   </div>
                </div>
                <div className="w-100 d-flex justify-content-center">
                    <button type="submit" className="btn btn-success">Actualizar</button>
                </div>
                        </form>
            </div>
        </div>
      </div>
      
      
      
      
      
      
      
    </div>
  )
}

export default Perfil
