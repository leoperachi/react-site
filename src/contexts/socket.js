import React, { createContext, useContext }  from 'react';
import socketio from 'socket.io-client';
import config from "../config";
import AuthConext from './auth';
import axios from 'axios';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    var socket = null;
    const { user } = useContext(AuthConext);
    return (
        <SocketContext.Provider value={{
            connect() {
                socket = socketio.connect(config.apiAddr, { transports : ['websocket'] });
                socket.on('connect', ()=> {
                    axios.get('https://geolocation-db.com/json/').then(data => {
                        socket.emit('updateActive', {email: user?.email, socketId: socket.id, ip: data.data.IPv4}, (response: any) => {
                            //console.log(response);
                        });
                    }).catch(err => {
                        console.log(err);
                    });
                });
                socket.on('connect_error', err => {
                    console.log('connect_error: ' + err);
                });
                socket.on('connect_failed', err => {
                    console.log('connect_failed: ' + err);
                });
                socket.on('receiveMsg', (from) => {
                    document.getElementById('btnToogle').click();
                    setTimeout(() => {
                        //abre o chat
                        document.getElementById('chat_'+ from.from).click();
                    }, 10);
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
            },
            getMsgs(userChat, me){
                return new Promise((resolve, reject) => {
                    socket.emit("getMsgs", {me: me, userChat: userChat}, (response) => {
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