import React from "react";
import SignIn from '../pages/signIn/signIn';
import SignUp from '../pages/signup/signUp';
import ForgotPassword from "../pages/forgotPassword/forgotPassword";

import {
    Routes,
    Route,
} from "react-router-dom";

const AuthRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/forgotPassword' element={<ForgotPassword />} />
                <Route path='*' element={<SignIn />} />
            </Routes>
        </>
    );
}

export default AuthRoutes;