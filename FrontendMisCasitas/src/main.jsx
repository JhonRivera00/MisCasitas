import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import {BrowserRouter} from 'react-router-dom'
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:3001"
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
