import React from 'react';
import {Routes, Route} from 'react-router-dom';

// COMPONENTS
import { Home } from './components/Home';
import LogIn from './components/LogIn';
import NavBar from './components/NavBar';
import CreateAccount from './components/CreateAccount';

import 'tailwindcss/tailwind.css';

export default function App(){

    return(
        <div className='w-100vw font-kanit'>
            <NavBar />
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/login'} element={<LogIn />} />
                <Route path={'/createaccount'} element={<CreateAccount />} />
            </Routes>
        </div>
    )
}