import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Auth } from 'aws-amplify';

interface User{
    email: string,
    password: string
}


export const NavBar = () => {



    const [user, setUser] = useState<User>({
        email: 'none',
        password: 'none'
    });

    useEffect(() => {
        Auth.currentAuthenticatedUser()
        .then(r => setUser(r.attributes));
    }, [])
    console.log(user)
    // console.log(user.username)

    return (
        <div className='w-screen border-b-2 border-b-blue'>
            <div className='w-80vw mx-auto flex justify-between items-center text-blue py-2 font-semibold'>
                <Link to='/'>
                    <h1>Moviefy</h1>
                </Link>
                {
                    Object.keys(user).length > 0 ?
                    <div className='flex items-center gap-1'>
                        <p>{user.email}</p>
                        <Link to='/login' className='font-bold rounded-sm text-blue p-2 border-2 border-blue hover:bg-gray-dark hover:text-blue hover:border-black duration-200'>Log Out</Link>
                    </div>
                    :
                    <Link to='/login' className='font-bold rounded-sm text-blue p-2 border-2 border-blue hover:bg-gray-dark hover:text-blue hover:border-black duration-200'>Log In</Link>
                }
            </div>
        </div>
    )
}