import React from 'react';
import {Routes, Route} from 'react-router-dom';

// COMPONENTS
import { LastMovies } from './components/LastMovies';
import { LogIn } from './components/LogIn';
import { NavBar } from './components/NavBar';

import 'tailwindcss/tailwind.css';

export default function App(){

    return(
        <div className='w-100vw font-kanit'>
            <NavBar />
            <Routes>
                <Route path={'/'} element={<LastMovies />} />
                <Route path={'/login'} element={<LogIn />} />
            </Routes>
        </div>
    )
}