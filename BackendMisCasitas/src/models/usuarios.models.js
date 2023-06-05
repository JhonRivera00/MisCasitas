import {Schema,model} from 'mongoose'
import bcrypt from 'bcrypt'
const usuarioSchema = new Schema (
{
    nombre:{
        type:String,
    },
    apellido:{
        type:String,
    },
    fecha_nacimiento:{
        type:Date,
    },
    identificacion:{
        type:Number,
    },
    foto_perfil:{
        type:String,
        default:null
    },
    usuario:{
        type:String,
        unique:true
    },contrasena:{
        type:String,
    },rol:{
        type:Schema.Types.ObjectId,
        ref:"Rol"
    }

},
{
    timestamps:false,
    versionKey:false
}

)
usuarioSchema.methods.encrypt = (contrasena)=>{
    return bcrypt.hash(contrasena,10)
}
usuarioSchema.statics.comparePassword =async(password,contrasena)=>{
    return await bcrypt.compare(password,contrasena)
}

export default model ("Usuarios", usuarioSchema)