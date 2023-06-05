import { useState } from "react"
import { loginUser } from "../data/data"
import { Link, useNavigate } from 'react-router-dom';
import Registro from './../modales/Registro';
function InicioSesion() {
  const [inicio, setInicio] = useState({
    usuario: "",
    contrasena: ""
  })
  const handleTarget = ({ target }) => {
    setInicio({ ...inicio, [target.name]: target.value })

  }
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()

    loginUser(inicio, navigate)

  }
  return (

    <div className="container d-flex align-items-center" style={{ height: "98vh" }}>
      <div className="row shadow-lg mx-4 w-100 ">

        <div className="col-6">
          <Link to={"/"}>
            <img src={"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=992&q=80"} className="w-100 shadow-lg img-fluid m-4" alt="" />
          </Link>


        </div>
        <div className="col-6 my-auto mx-auto d-flex justify-content-center ">

          <form onSubmit={handleSubmit} className="w-75">
            <h1 className="text-center mb-5 fs-1 display-4"> Mis Casitas 💸</h1>

            <div className=" form-floating mb-3">
              <input type="text" className="form-control" name="usuario" value={inicio.usuario} onChange={handleTarget} />
              <label htmlFor="" className="form-label">Usuario</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" name="contrasena" value={inicio.contrasena} onChange={handleTarget} />
              <label htmlFor="" className="form-label">Contraseña</label>
            </div>
            <div className="d-flex justify-content-between">

              <button type="submit" className="btn btn-success my-2" data-bs-dismiss="modal" >Iniciar Sesion</button>
              <p className="d-flex d-inline-block " >
                No tienes cuenta? <p type="button" className="link-info ps-3" data-bs-toggle="modal" data-bs-target="#registro">Registrate </p>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Registro />
    </div>
  )
}

export default InicioSesion
