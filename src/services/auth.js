import api from '../services/api';

export function signIn(username, password) {
    return new Promise((resolve, reject) => {
        api.post('/login', { 'email': username, 'password': password })
        .then((response) => {
            resolve(response.data);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

export function signUp(username, password) {
    return new Promise((resolve, reject) => {
        api.post('/register', { 'email': username, 'password': password })
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            }
        );
    })
}

export function uploadProfilePhoto(userId, picture){
    return new Promise((resolve, reject) => {
        api.post('/uploadProfilePhoto', 
            {   
                'userId': userId, 
                'base64image': picture 
            }
        ).then((response) => {
            resolve(response.data);
        }).catch((err) => {
            console.log(err);
        });
    });
}

export function updateProfileInfo(user){
    return new Promise((resolve, reject) => {
        console.log(user);
        api.post('/updateProfileInfo', 
            {   
                userId: user._id
            }
        ).then((response) => {
            resolve(response.data);
        }).catch((err) => {
            console.log(err);
        });
    });
}