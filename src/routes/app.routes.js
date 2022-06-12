import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from '../pages/layout/layout';
import Dashboard from "../pages/dashboard/dashboard";
import Profile from "../pages/profile/profile";
import Home from "../pages/home/home";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route path="/" element={<Dashboard />} /> 
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/home" element={<Home />} />
                </Route>
            </Routes>
            
        </>
    );
}

export default AppRoutes;