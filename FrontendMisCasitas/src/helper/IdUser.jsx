import jwtDecode from "jwt-decode"

export const idUser=async()=>{
    const token=localStorage.getItem("token")
    const jwt= jwtDecode(token);

    return jwt
}