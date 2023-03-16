import React, {useContext, useState} from "react";
import Navbar from '../../components/NavBar/NavBar';
import AuthConext from '../../contexts/auth';
import { Outlet } from 'react-router-dom';
import PageLoader from '../../components/PageLoader/PageLoader';
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import SocketContext from "../../contexts/socket";

const Layout = (props) => {
    const inputRef = React.useRef(null);
    const { user, signOut } = useContext(AuthConext);
    const { connect, getUsers, sendMsg, getMsgs } = useContext(SocketContext);
    const [hidden, sethidden] = useState(true);
    const [usersLoaded, setUsersLoaded] = useState(false);
    const [usersChat, setUsersChat] = useState([]);
    const [hiddenCW, sethiddenCW] = useState(true);
    const [usrDstCW, setusrDstCW] = useState('');
    const [messages, setMessages] = useState([]);
    
    const handle = () => {
        signOut();
    };

    const changeFile = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
          user.profilePhoto = reader.result.toString();
          for(var i=0;i<document.getElementsByClassName("img1").length; i++){
            document.getElementsByClassName("img1")[i].src = reader.result.toString();
          }
        };
    };

    const loadUsersChat = (e) => {
        if(!usersLoaded){
            //connect(); //Dps de autenticado inicia o Socket
            getUsers(user.id).then((users) => {
                //console.log(users);
                setUsersChat(users);
            });
        }

        setUsersLoaded(true);    
    };

    const onStartChat = (e) => {
        sethiddenCW(false);
        var usrDst = e.target.childNodes[0].nodeValue;
        setusrDstCW(usrDst);
        getMsgs(usrDst, user.email).then((msgs) => {
            setMessages(msgs);
        })
    }

    const onCloseCW = () => {
        sethiddenCW(true);
    };

    const onSentMsg = (msg, to, dtSent) => {
        let d = new Date();
        let date = new Date(d.valueOf() - d.getTimezoneOffset() * 60000); //colocando no horario do brasil
        return new Promise((resolve, reject) => {
            sendMsg(user.email, to, msg, date).then((response) => {
                resolve(response);
            });
        });
    }

    return ( 
        <>
            <Navbar user={user} handleLogout={handle} 
                changeFile={changeFile} 
                loadUsersChat={loadUsersChat} 
                usersChat={usersChat}
                onStartChat={onStartChat}/>
            <div ref={inputRef}><Outlet /></div>
            <PageLoader hidden={hidden}></PageLoader>
            <ChatWindow show={hiddenCW} 
                usrDst={usrDstCW}
                onCloseCW={onCloseCW}
                messages={messages}
                me={user.email}
                onSentMsg={onSentMsg}></ChatWindow>
        </>
    );
};
export default Layout;