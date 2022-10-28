import React from 'react';

import { LastMovies } from './LastMovies';

export const Home = () => {
    return (
        <div className='text-white'>
            <h1 className='text-white'>Home</h1>
            <p>descripcion de toda la web!</p>
            
            <LastMovies />
        </div>
    )
}
