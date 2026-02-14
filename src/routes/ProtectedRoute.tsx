import { useSelector } from "react-redux"
import type { RootState } from "../app/store"
import { Navigate, Outlet } from "react-router-dom"
import config from "../config/config"


const ProtectedRoute = () => {
    const token = useSelector((state: RootState) => state.auth.token)

    const isValid = async () => {
        try {
            const valid = await config.get('/auth/is-valid');
            return valid.data;
        } catch (error: any) {
            return error.response;
        }
    }

    isValid().then((res) => {
        if(res.status === 401 && res.data.message === "Unauthorized"){
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
    })

    if(!token){
        return <Navigate to="/login" replace />
    }



    return <Outlet />
}

export default ProtectedRoute