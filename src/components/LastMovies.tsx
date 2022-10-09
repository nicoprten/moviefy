import React, { MouseEvent, useRef } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// COMPONENTS
import MovieCard from './MovieCard';

// ICONS
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface Movie{
    id: number,
    title: string,
    poster_path: string,
    release_date: string,
    vote_average: number
}

export const LastMovies = () => {

    const [lastMovies, setLastMovies] = useState<Array<Movie>>([]);
    console.log(lastMovies)

    const sliderRef = useRef<HTMLDivElement>(null);

    const date = new Date();
    let releaseDateNow = `${date.getFullYear()}-${parseDate(date.getMonth() + 1)}-${parseDate(date.getDate())}`;
    let releaseDateWeek = `${date.getFullYear()}-${parseDate(date.getMonth() + 1)}-${parseDate(date.getDate() + 7)}`;

    // Example: 8 => return 08
    function parseDate(date: number) {
        const newDate = date < 10 ? `0${date}` : date;
        return newDate;
    }

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${releaseDateNow}&primary_release_date.lte=${releaseDateWeek}&api_key=5a124b627856216bf209486ade0bc869`)
        .then(r => r.data)
        .then(d => setLastMovies(d.results))
    }, [])

    const handleBackSlide = (e: MouseEvent<HTMLButtonElement>) => {
        sliderRef.current!.scrollLeft -= sliderRef.current!.clientWidth;
    }
    
    const handleNextSlide = (e: MouseEvent<HTMLButtonElement>) => {
        sliderRef.current!.scrollLeft += sliderRef.current!.clientWidth;
    }

    return(
        <div className="w-80vw mx-auto my-4">
            {lastMovies.length > 0 ? 
                <div>
                    <h2 className='text-blue text-2xl font-bold px-8'>Movies next week</h2>
                    <p className='text-white px-8'>Add them to your <Link className='text-blue hover:text-white' to='/watchlist'>watchlist</Link></p>
                    <div className='relative px-8'>
                        <button onClick={handleBackSlide}>
                            <ArrowBackIosNewIcon className='text-blue absolute top-1/2 left-0 z-0 hover:cursor-pointer'/>
                        </button>
                        <div className='flex h-auto py-4 overflow-x-auto scroll scroll-smooth' ref={sliderRef}>
                            {lastMovies?.map(m => 
                                m.poster_path && <MovieCard {...m} key={m.id}/>
                            )}
                        </div>
                        <button onClick={handleNextSlide}>
                            <ArrowForwardIosIcon className='text-blue absolute top-1/2 right-0 z-0 hover:cursor-pointer'/>
                        </button>
                    </div>
                </div>
            :
                <p className='text-blue'>Waiting for movies</p>
            }
        </div>
    )
}