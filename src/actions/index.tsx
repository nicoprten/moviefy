const axios = require('axios');

import { Amplify, API, Auth } from 'aws-amplify';
import awsExports from '../aws-exports';
Amplify.configure(awsExports);

export function logIn(email: any, password: any){
    return function(dispatch: any){
        return Auth.signIn(email, password)
        // .then(r => r.json())
        .then(d => dispatch({type: 'LOG_USER', payload: d}))
        .catch(e => console.log('Error logueando ', e));
    }
}