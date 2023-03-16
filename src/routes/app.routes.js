import React, { useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from '../pages/layout/layout';
import Dashboard from "../pages/dashboard/dashboard";
import Profile from "../pages/profile/profile";
import Home from "../pages/home/home";
import SocketContext from "../contexts/socket";
import AuthConext from "../contexts/auth";

const AppRoutes = () => {
    const [socketConnected, setSocketConnected] = useState(false);
    const {connect, getUsers} = useContext(SocketContext);
    const [users, setUsers] = useState([]);
    const { signOut, user } = useContext(AuthConext);

    if(!socketConnected){
        connect();
        getUsers(user.id).then((aux) => {
            const newTodos = [...aux];
            setUsers(newTodos);
        });
        setSocketConnected(true);
    }

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