import axios from "axios"
import Swal from "sweetalert2"
import jwtDecode from "jwt-decode"

export const loginUser = async (inicio, navigate) => {
    try {

        const response = await axios.post("/loginUsuario", inicio)
        if (response.status === 200) {
            Swal.fire({
                icon: "success",
                title: response.data.message,
                timer: 1000
            }).then(() => {
                const token = response.data.token
                const nombre = response.data.nombre
                localStorage.setItem("token", token)
                localStorage.setItem("User", nombre)
                const dataT = jwtDecode(token)
                switch (dataT.rol) {
                    case "admin":
                        navigate("/admin");
                        break;
                    case "cliente":
                        navigate("/cliente");
                        break;
                    default:
                        navigate("/")
                }

            }
            )
        }
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: "error",
            title: error.response.data,
            timer: 3000
        })
    }
}
export const createUser = async (formData) => {
    try {
        const response = await axios.post("/usuario", formData)
        if (response.status === 200) {
            Swal.fire({
                icon: "success",
                title: response.data,
                timer: 3000
            }).then(location.reload())
        }
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: "error",
            title: error.response.data,
            timer: 3000
        })
    }
}

export const verUsuario = async () => {
    try {
        const token = localStorage.getItem("token")
        const { id } = jwtDecode(token)
        const response = await axios.get(`/usuario/${id}`)

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const verCasasDisponibles = async () => {
    try {
        const response = await axios.get(`/casa`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const verCasa = async (id) => {
    try {
        const { data } = await axios.get(`/casa/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
}
export const alquilarCasas = async (data) => {
    try {
        const response = await axios.post(`/alquilarcasa`, data)
        if (response.status === 200) {
            Swal.fire({
                icon: "success",
                title: response.data,
                timer: 3000,
                showConfirmButton: false
            }).then(() => {
                location.reload()
            })
        }
    } catch (error) {
        console.log(error)
        console.log(error)
        Swal.fire({
            icon: "error",
            title: error.response.data,
            timer: 3000
        })
    }
}

export const mialquiler = async (id) => {
    try {
        const response = await axios.get(`/alquiladas/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const casas = async () => {
    try {
        const response = await axios.get(`/casa`)
        return response.data
    } catch (error) {
        console.log(error)

    }
}
export const crearCasa = async (data) => {
    try {
        const response = await axios.post(`/casa`, data)
        if (response.status === 200) {
            Swal.fire({
                icon: "success",
                title: response.data,
                timer: 2000
            }).then(() => {
                location.reload()
            }
            )
        }
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: "error",
            title: error.response.data,
            timer: 3000
        })
    }
}
export const eliminarCasa = async (id) => {
    try {

        const response = await axios.delete(`/casa/${id}`)
        if (response.status === 200) {
            Swal.fire({
                icon: "success",
                title: response.data,
                timer: 2000
            }).then(() => {
                location.reload()
            })
        }
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: "error",
            title: error.response.data,
            timer: 3000
        })
    }
}

export const actualizarUser = async (_id, data) => {
    try {
        // for (let [key, value] of data.entries()) {
        //     console.log(key, value);
        //   }
        Swal.fire({
            icon:"question",
            title:"Deseas actualizar tus datos ?",
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Si',
            cancelButtonText:"No"
        }).then(async (result)=>{
          if(result.isConfirmed){
            
              const response = await axios.put(`/actualizarUsuario/${_id}`, data)
              if (response.status === 200) {
                  Swal.fire({
                      icon: "success",
                      title: response.data,
                      timer: 2000
                  }).then(()=>{
                    location.reload()
                  })
              }
          }
        })
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: "error",
            title: error.response.data,
            timer: 2000
        })
    }
}
export const actualizarCasa = async (_id, data) => {
    try {
        const response = await axios.put(`/actualizarCasa/${_id}`, data)
        if (response.status === 200) {
            Swal.fire({
                icon: "success",
                title: response.data,
                timer: 2000,
            }).then(() => {
                location.reload()
            })
        }
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: "error",
            title: error.response.data,
            timer: 2000
        })
    }
}
export const activarCasa = async (_id) => {
    try {
        const response = await axios.put(`/activarCasa/${_id}`)
        console.log(response)
        if (response.status === 200) {
            Swal.fire({
                icon: "success",
                title: response.data,
                timer: 2000,
            }).then(() => {
                location.reload()
            })
        }
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: "error",
            title: error.response.data,
            timer: 2000
        })
    }
}
export const cancelarCa = async (id) => {
    try {
        const response = await axios.put(`/cancelar/${id}`)
        if (response.status === 200) {
            Swal.fire({
                icon: "success",
                title: response.data,
                timer: 2000
            }).then(() => {
                location.reload()
            })
        }
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: "error",
            title: error.response.data,
            timer: 2000
        })
    }
}
export const validarToken = async () => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            authorization: token
        };
        const response = await axios.post(`/token`,null, {headers} )
        return response.data
    } catch (error) {
        console.log(error)
    }
}