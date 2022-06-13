import React, { createContext, useState }  from 'react';
import * as auth from '../services/auth';
import io from 'socket.io-client';
import config from "../config";

const AuthConext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    var socket = null;

    function connectSocket(){
        socket = io.connect(config.apiAddr, { transports : ['websocket'] });
        socket.on('connect', ()=> {
            console.log('Socket Connected');
        });
        socket.on('connect_error', err => {
            console.log('entrei1');
            console.log(err);
        });
        socket.on('connect_failed', err => {
            console.log('entrei2');
            console.log(err);
        });
       
    }

    function signIn(username, password) {
        return new Promise((resolve, reject) => {
            auth.signIn(username,password).then((response) => {
                setUser(response);
                localStorage.setItem('userLogged', response);
                resolve(response);
            }).catch((error) => {
                reject(error)
            });
        });
    }

    function signOut() {
        setUser(null);
        localStorage.removeItem('userLogged');
        return false;
    }

    function signUp(username, password) {
        return new Promise((resolve, reject) => {
            auth.signUp(username,password).then((response) => {
                //console.log(response);
                resolve(response);
            }).catch((error) => {
                reject(error)
            });
        });
    }

    function uploadProfilePhoto(userId, picture){
        return new Promise((resolve, reject) => {
            auth.uploadProfilePhoto(userId, picture).then((response) => {
                //console.log(response);
                resolve(response);
            }).catch((error) => {
                reject(error)
            });
        });
    }

    function updateProfileInfo(user){
        return new Promise((resolve, reject) => {
            auth.updateProfileInfo(user).then((response) => {
                //console.log(response);
                resolve(response);
            }).catch((error) => {
                reject(error)
            });
        });
    }

    function getUsersChat(){
        return new Promise((resolve, reject) => {
            socket.emit("getUsers", user.id, (users) => {
                //console.log(users);
                resolve(users);
            });
        });
    }

    function sendMsg(from, to, msg, dtMsgSent) {
        return new Promise((resolve, reject) => {
            socket.emit("sendMsg", {from: from, to: to ,msg: msg, dtMsgSent: dtMsgSent}, (response) => {
                resolve(response);
            });
        });
    }

    return (
        <AuthConext.Provider value={{
                signed: !!user, 
                user: user, 
                signIn: signIn, 
                signOut: signOut, 
                signUp: signUp,
                uploadProfilePhoto: uploadProfilePhoto,
                updateProfileInfo: updateProfileInfo,
                connectSocket: connectSocket,
                getUsersChat: getUsersChat,
                sendMsg: sendMsg
            }}>
            {children}
        </AuthConext.Provider>
    );
}

export default AuthConext;