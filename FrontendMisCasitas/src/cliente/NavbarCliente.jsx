
import { Link, Outlet} from 'react-router-dom';

function home() {
 

  return (
    <div>
          <nav className="d-flex justify-content-between"  style={{background:"#39a900"}}>
            
      <Link className="m-2 fs-4 fw-medium ms-4 nav-link" to={"/"}>Mis Casitas</Link>
      <div className='d-flex'>

      <Link className='navbar nav-link fs-6 text-white me-5 ' to={"/cliente"}>CASAS</Link>
      <Link className='navbar nav-link fs-6 text-white me-5' to={"/cliente/alquiler"}>ALQUILER</Link>
      <Link className='navbar nav-link fs-6 text-white me-5' to={"/cliente/perfil"}>PERFIL</Link>
      <button className="btn btn-success my-1 me-2" onClick={()=>{localStorage.clear(), location.reload()}}>Cerrar Sesion</button>
      </div>
    </nav>
      
  
      <Outlet/>
    </div>
  )
}

export default home
