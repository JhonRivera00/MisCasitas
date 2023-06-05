import { useEffect, useRef, useState } from "react"
import { activarCasa, casas } from "../data/data"
import ActualizarCasa from './modales/ActualizarCasa'
import { eliminarCasa } from './../data/data';
import { useDownloadExcel } from 'react-export-table-to-excel'

function Page() {
  const tableRef = useRef(null)
  const [casa, setCasa] = useState([])
  const [idCasa, setIdCasa] = useState("")

  useEffect(() => {
    (async () => {
      const data = await casas();
      setCasa(data)
    })()
  }, [])
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Casas",
    sheet: "Casas"
  })




  return (
    <div className="container-md pt-5">
      <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#crearCasa">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      </button>
      <button className="btn btn-success  float-end" onClick={onDownload}>Exportar</button>
      <table className="table" ref={tableRef}>
        <thead>
          <tr>
            <th scope="col">Tipo Casa</th>
            <th scope="col">Dirreccion</th>
            <th scope="col">Costo</th>
            <th scope="col">Numero Pisos</th>
            <th scope="col">Estado</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {casa.map((casas) => (
            <tr key={casas._id}>
              <th scope="row">{casas.tipo_casa}</th>
              <td>{casas.direccion}</td>
              <td>{casas.costo}</td>
              <td>{casas.num_pisos}</td>
              <td><p className={casas.estado === "disponible" ? "bg-success rounded-pill text-center" : casas.estado === "desactivada" ? "bg-danger rounded-pill text-center" : "bg-warning rounded-pill text-center"}>{casas.estado}</p></td>
              <td>
                <button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#actualizarCasa" onClick={()=>{setIdCasa(casas._id)}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                  </svg>
                </button>
                <button className="btn btn-danger ttbtn-sm ms-3" onClick={() => (async () => await eliminarCasa(casas._id))()} >
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg>
                </button>
                <button onClick={()=>(async()=> await activarCasa(casas._id))()} className={casas.estado === "desactivada" ? "btn btn-success ms-3" : "btn btn-warning ms-3"} >{casas.estado === "desactivada" ? "activar" : "desactivar"}</button>
              </td>
            </tr>
          ))}
          <ActualizarCasa id={idCasa} />
        </tbody>
      </table>

    </div>
  )
}

export default Page
