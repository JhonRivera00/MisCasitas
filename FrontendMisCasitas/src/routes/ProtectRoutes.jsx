
import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { idUser } from '../helper/IdUser';
import { validarToken } from '../data/data';


export const ProtectRoutes =  () => {
  const navigate = useNavigate()

  const [auth, setauth] = useState(false)
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        return navigate("/inicioSesion")
      } else {
        const { rol } = await idUser()
        const data = await validarToken()
   console.log(data)

        if (rol === "cliente" || rol === "admin" && data === true) {
          setauth(true)
        } else {
          localStorage.clear("token")
          return navigate("/inicioSesion")

        }
      }
    })()

  }, [navigate])
 return auth ? <Outlet /> : null

}



export const ProtectRoutesAdmin =  () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [auth, setauth] = useState(false)
  useEffect(() => {
    (async()=>{
  if (!token) {
    return navigate("/inicioSesion")
  } else {
    const { rol } = await idUser()
   const data = await validarToken()
    if (rol === "admin" && data === true) {
      setauth(true)
    } else {
      localStorage.clear("token")
      return navigate("/inicioSesion")

    }
  }

})()
  }, [navigate,token])
  return auth ? <Outlet /> : null
}



