import Roles from "../models/roles.models.js"

export const createRoles = async ()=>{
    try {
        const coutn = Roles.estimatedDocumentCount();
        if(coutn>0)return
        const values = await Promise.all([
            new Roles({nombre:"admin"}).save(),
            new Roles({nombre:"cliente"}).save(),

        ])
        console.log(values)
    } catch (error) {
        console.log(error)
    }
}