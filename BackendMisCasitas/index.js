import app  from './src/app.js'
import { PORT } from './src/config.js'
import './src/db/db.js'

app.listen(PORT,()=>{
    console.log("Server listen in port "+ PORT )
})    