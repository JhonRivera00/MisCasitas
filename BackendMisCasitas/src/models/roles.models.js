import { Schema, model } from "mongoose";

const rolEschema = new Schema(
    {
        nombre:{
            type:String
        }
    },
    {
        timestamps:false,
        versionKey:false
    }
)
export default model("Rol",rolEschema)