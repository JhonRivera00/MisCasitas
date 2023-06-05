import {Schema,model} from 'mongoose'   

const alquilerSchema = new Schema (
    {
        casaId:{
            type:Schema.Types.ObjectId,
            ref:"Casas"
        },
        usuarioId:{
            type:Schema.Types.ObjectId,
            ref: "Usuarios"
        },
        estado:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps:false,
        versionKey:false
    }
)
export default model ("Alquiler", alquilerSchema)