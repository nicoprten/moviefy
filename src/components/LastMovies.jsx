import { useEffect, useState } from 'react';

import axios from 'axios';

export default function LastMovies(){

    const [lastMovies, setLastMovies] = useState([]);

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=5a124b627856216bf209486ade0bc869')
        .then(r => r.data)
        .then(d => setLastMovies(d.results))
    }, [])

    return(
        <>
            <p>lastmovies</p>
            {lastMovies?.map(m => 
                <>
                    <p>{m.title}</p>
                    <img src={`https://image.tmdb.org/t/p/original${m.poster_path}`} alt={m.title} width='300px'/>
                </>
            )}
        </>
    )
}