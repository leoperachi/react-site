import React, {useContext} from "react";
import AuthConext from "../contexts/auth";
import AuthRoutes from './auth.routes';
import AppRoutes from "./app.routes";
  
const Routes = () => {
    const { signed } = useContext(AuthConext);
    return signed ? <AppRoutes/> : <AuthRoutes/>;
}

export default Routes;