const axios = require('axios');

import { Amplify, API, Auth } from 'aws-amplify';
import awsExports from '../aws-exports';
Amplify.configure(awsExports);

export function logIn(email, password){
    return function(dispatch){
        return Auth.signIn(email, password)
        .then(d => dispatch({type: 'LOG_USER', payload: d}))
        .catch(e => console.log('Error loging ', e));
    }
}

export function logOut(){
    return function(dispatch){
        return Auth.signOut()
        .then(d => dispatch({type: 'LOGOUT_USER', payload: d}))
        .catch(e => console.log('Error loging out ', e));
    }
}