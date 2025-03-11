import { Outlet, Navigate } from "react-router-dom";
import { obterCookie } from "../utils/Cookies";

const PrivateRoute = ()=>{
    const token = obterCookie("token");
    return token ? <Outlet/> : <Navigate to="/" />;
}

export default PrivateRoute;