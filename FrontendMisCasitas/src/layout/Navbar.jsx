import { Link } from 'react-router-dom'
import Landing from './Landing'
function Home() {

  return (
    <>
    <nav className="d-flex justify-content-between"  style={{background:"#39a900"}}>
      <Link className="m-2 fs-4 fw-medium ms-4 nav-link" to={"/"}>Mis Casitas</Link>
      <Link className="btn btn-success my-1" to={"/inicioSesion"} >Inicio Sesion</Link>
    </nav>
 
 <Landing/>
    </>

  ) 
}

export default Home
