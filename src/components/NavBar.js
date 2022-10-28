import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Auth } from 'aws-amplify';

import { logIn, logOut } from './../actions/index';

const NavBar = ({}) => {

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        Auth.currentAuthenticatedUser()
        .then(r => setCurrentUser(r));
    }, [])

    async function handleLogOut(){
        Auth.signOut()
        .then(d => setCurrentUser({}))
        .catch(e => console.log('Error loging out ', e));
    } 

    return (
        <div className='w-screen border-b-2 border-b-blue'>
            <div className='w-80vw mx-auto flex justify-between items-center text-blue py-2 font-semibold'>
                <Link to='/'>
                    <h1>Moviefy</h1>
                </Link>
                {
                    Object.keys(currentUser).length > 0 ?
                    <div className='flex items-center gap-1'>
                        <p>{currentUser.username}</p>
                        <Link to='/login' className='font-bold rounded-sm text-blue p-2 border-2 border-blue hover:bg-gray-dark hover:text-blue hover:border-black duration-200' onClick={() => handleLogOut()}>Log Out</Link>
                    </div>
                    :
                    <Link to='/login' className='font-bold rounded-sm text-blue p-2 border-2 border-blue hover:bg-gray-dark hover:text-blue hover:border-black duration-200'>Log In</Link>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user
    }
}

export default connect(mapStateToProps, { logIn, logOut })(NavBar);