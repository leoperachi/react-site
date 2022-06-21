import React, { createContext, useState }  from 'react';
import socketio from 'socket.io-client';
import config from "../config";
import AuthConext from './auth';

const   SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    var socket = null;
    return (
        <SocketContext.Provider value={{
            connect() {
                socket = socketio.connect(config.apiAddr, { transports : ['websocket'] });
                socket.on('connect', ()=> {
                    console.log('Socket Connected');
                });
                socket.on('connect_error', err => {
                    console.log('connect_error: ' + err);
                });
                socket.on('connect_failed', err => {
                    console.log('connect_failed: ' + err);
                });
            },
            getUsers(userId) {
                return new Promise((resolve, reject) => {
                    socket.emit("getUsers", userId, (users) => {
                        //console.log(users);
                        resolve(users);
                    });
                });
            },
            sendMsg(from, to, msg, dtMsgSent) {
                return new Promise((resolve, reject) => {
                    socket.emit("sendMsg", {from: from, to: to ,msg: msg, dtMsgSent: dtMsgSent}, (response) => {
                        resolve(response);
                    });
                });
            }
        }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;