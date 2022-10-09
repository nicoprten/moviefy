import React from 'react';

import { Link } from 'react-router-dom';

export const NavBar = () => {
    return (
        <div className='w-screen border-b-2 border-b-blue'>
            <div className='w-80vw mx-auto flex justify-between items-center text-blue py-2 font-semibold'>
                <Link to='/'>
                    <h1>Moviefy</h1>
                </Link>
                <Link to='/login' className='font-bold rounded-sm text-blue p-2 border-2 border-blue hover:bg-gray-dark hover:text-blue hover:border-black duration-200'>Log In</Link>
            </div>
        </div>
    )
}