import { useState } from "react"
import { createUser } from "../data/data"

function Registro() {
    const [fotoPerfil, setFotoPerfil] = useState("")
    const [data, setData] = useState({
        nombre: "",
        apellido: "",
        fecha_nacimiento: "",
        identificacion: 0,
        usuario: "",
        contrasena: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("nombre", data.nombre)
        formData.append("apellido", data.apellido)
        formData.append("fecha_nacimiento", data.fecha_nacimiento)
        formData.append("identificacion", data.identificacion)
        formData.append("usuario", data.usuario)
        formData.append("contrasena", data.contrasena)
        formData.append("foto_perfil", fotoPerfil)

        createUser(formData)


    }
    const handleTarget = ({ target }) => {
        setData({ ...data, [target.name]: target.value })

    }

    return (
        <div>


            <div className="modal " id="registro" tabIndex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalTitleId">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control" name="nombre" value={data.nombre} id="formId1" onChange={handleTarget} placeholder="" />
                                    <label htmlFor="formId1">Nombre</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control" name="apellido" value={data.apellido} id="formId1" onChange={handleTarget} placeholder="" />
                                    <label htmlFor="formId1">Apellido</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="date" className="form-control" name="fecha_nacimiento" value={data.fecha_nacimiento} onChange={handleTarget} id="formId1" placeholder="" />
                                    <label htmlFor="formId1">Fecha Nacimiento</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="Number" className="form-control" name="identificacion" value={data.identificacion} onChange={handleTarget} id="formId1" placeholder="" />
                                    <label htmlFor="formId1">Identificacion</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text" className="form-control" name="usuario" value={data.usuario} onChange={handleTarget} id="formId1" placeholder="" />
                                    <label htmlFor="formId1">Usuario</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password" className="form-control" value={data.contrasena} onChange={handleTarget} name="contrasena" id="formId1" placeholder="" />
                                    <label htmlFor="formId1">Contraseña</label>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Foto Perfil</label>
                                    <input type="file" className="form-control" name="foto_perfil" onChange={(e) => setFotoPerfil(e.target.files[0])} id="" placeholder="" aria-describedby="fileHelpId" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>







        </div>
    )
}

export default Registro
