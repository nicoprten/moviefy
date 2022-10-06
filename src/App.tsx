import React from 'react';
import LastMovies from './components/LastMovies';
import 'tailwindcss/tailwind.css';

export default function App(){

    return(
        <div className='w-screen mx-auto'>
            <h1 className='text-3xl font-bold'>Moviefy</h1>
            <LastMovies />
        </div>
    )
}