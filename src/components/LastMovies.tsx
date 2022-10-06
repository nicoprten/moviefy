import React, { MouseEvent, useRef } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface Movie{
    id: number,
    title: string,
    poster_path: string,
    release_date: string
}

export default function LastMovies(){

    const [lastMovies, setLastMovies] = useState<Array<Movie>>([]);

    const sliderRef = useRef<HTMLDivElement>(null);
    console.log(lastMovies)
    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=5a124b627856216bf209486ade0bc869')
        .then(r => r.data)
        .then(d => setLastMovies(d.results))
    }, [])

    const handleBackSlide = (e: MouseEvent<HTMLButtonElement>) => {
        // sliderRef.current!.scroll(500, 500);
        sliderRef.current!.scrollLeft -= 815;
        console.log(sliderRef.current!.scrollLeft)
        console.log(sliderRef)
    }
    
    const handleNextSlide = (e: MouseEvent<HTMLButtonElement>) => {
        sliderRef.current!.scrollLeft += 815;
        console.log(sliderRef.current!.scrollLeft)
        console.log(sliderRef)
    }

    return(
        <>
            <h2 className='text-blue text-2xl font-medium'>Last movies added</h2>
            <div className='relative px-8'>
                <button onClick={handleBackSlide}>
                    <ArrowBackIosNewIcon className='text-blue absolute top-1/2 left-0 z-0 hover:cursor-pointer'/>
                </button>
                <div className='flex h-auto py-4 overflow-hidden scroll scroll-smooth' ref={sliderRef}>
                    {lastMovies?.map(m => 
                        <div className='bg-gray-dark shrink-0 mx-2 rounded-xl hover:cursor-pointer hover:scale-105 duration-300 pb-2 z-1' key={m.id}>
                            <img className='rounded-xl rounded-b-none h-[220px] object-cover' src={`https://image.tmdb.org/t/p/original${m.poster_path}`} alt={m.title}/>
                            <div className='mx-auto mt-2 w-32'>
                                <p className='text-blue font-medium'>{m.title.substring(0, 15)}</p>
                                <p className='text-blue text-sm'>{m.release_date}</p>
                            </div>
                        </div>
                    )}
                </div>
                <button onClick={handleNextSlide}>
                    <ArrowForwardIosIcon className='text-blue absolute top-1/2 right-0 z-0 hover:cursor-pointer'/>
                </button>
            </div>
        </>
    )
}