import {Schema,model} from 'mongoose'   

const casaSchema = new Schema(
    {
        tipo_casa :{
            type:String
        },direccion :{
            type:String
        },costo :{
            type:String
        },medidas :{
            ancho:{
                type:Number
            },
            largo:{
                type:Number
            }
            
        },num_pisos :{
            type:String
        },descripcion :{
            type:String
        },capacida_max_personas :{
            type:Number
        },
        estado :{
            type:String,
            enum:["disponible","alquilada","desactivada"]
        },
    },
    {
        timestamps:false,
        versionKey:false
    }
)
export default model ("Casas", casaSchema)