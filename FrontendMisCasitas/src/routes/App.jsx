
import Navbar from '../layout/Navbar'
import { Routes, Route } from 'react-router-dom'
import HomeCliente from '../cliente/NavbarCliente'
import NavbarAdmin from '../admin/navbar/Navbar'
import InicioSesion from '../layout/InicioSesion'
import Casas from '../cliente/pages/Casas'
import Alquiler from '../cliente/pages/Alquiler'
import Perfil from '../cliente/pages/Perfil.jsx'
import Page from '../admin/Page'
import { ProtectRoutes, ProtectRoutesAdmin } from './ProtectRoutes'
function App() {

  return (
    <Routes>
      <Route index element={<Navbar />} />
      <Route path='/inicioSesion' element={<InicioSesion />} />

      <Route element={<ProtectRoutes />}>
        <Route path='/cliente' element={<HomeCliente />}>
          <Route index element={<Casas />} />
          <Route path='/cliente/alquiler' element={<Alquiler />} />
          <Route path='/cliente/perfil' element={<Perfil />} />
        </Route>
      </Route>


      <Route element={<ProtectRoutesAdmin />}>
        <Route path='/admin' element={<NavbarAdmin />}>
          <Route index element={<Page />} />
        </Route>
      </Route>
    </Routes>

  )
}

export default App
