import { Outlet } from "react-router-dom"

function navbar() {
  return (
    <>
    <div style={{background:"#fc7323"}}>
  <div className="d-flex justify-content-between">
    <h2 className="text-white ms-3">Mis Casitas</h2>
    <button className="btn btn-danger me-3 my-1" onClick={()=>localStorage.clear(location.reload()) }>Cerrar Sesion</button>
  </div>
      
    </div>
    <Outlet/>
    </>
  )
}

export default navbar
