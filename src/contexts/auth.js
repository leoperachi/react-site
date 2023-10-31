import React, { createContext, useState }  from 'react';
import * as auth from '../services/auth';

const AuthConext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

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
                resolve(response);
            }).catch((error) => {
                reject(error)
            });
        });
    }

    function forgotPassword(email){
        return new Promise((resolve, reject) => {
            auth.forgotPassword(email).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error)
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
                forgotPassword: forgotPassword
            }}>
            {children}
        </AuthConext.Provider>
    );
}

export default AuthConext;