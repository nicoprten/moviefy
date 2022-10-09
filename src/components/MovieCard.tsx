import React from 'react';
import { Link } from 'react-router-dom';

// ICONS
import StarRateIcon from '@mui/icons-material/StarRate';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';

interface Movie{
    id: number,
    title: string,
    poster_path: string,
    release_date: string,
    vote_average: number
}

export default function MovieCard({ id, title, poster_path, release_date, vote_average }: Movie){

    return(
        <div className='text-blue bg-gray-dark shrink-0 mx-2 rounded-xl hover:cursor-pointer hover:scale-105 duration-300 pb-2 z-1 relative group' key={id}>
            <img className='rounded-xl rounded-b-none h-[250px] object-cove' src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={title}/>
            <div className='mx-auto mt-2 ml-2'>
                <p className='font-semibold inline-block hover:underline'>
                    {title.length > 14 ? `${title.substring(0, 14)}...` : title}
                </p>
                <p className='text-sm'>{release_date}</p>
            </div>
            <div className='flex items-center absolute top-2 right-2 font-bold bg-gray-dark p-2 rounded-md'>
                <StarRateIcon fontSize='small'/>
                <p className=''>{vote_average}</p>
            </div>
            <div className='flex flex-col items-center font-bold bg-gray-dark absolute w-full top-1/4 text-gray-light opacity-0 group-hover:opacity-100 duration-200'>
                <Link className='flex justify-between gap-1 w-full px-4 py-2 h-full border-b-2 border-b-gray hover:text-white duration-200' to='/watchlist'>
                    <p>WATCHLIST</p>
                    <AddCircleIcon />
                </Link>
                <Link className='flex justify-between gap-1 w-full px-4 py-2 h-full border-b-2 border-b-gray hover:text-white duration-200' to='/watchlist'>
                    <p>MOVIELIST</p>
                    <AddCircleIcon />
                </Link>
                <Link className='flex justify-between gap-1 w-full px-4 py-2 h-full hover:text-white duration-200' to={`/movie:${id}`}>
                    <p>DETAIL</p>
                    <InfoIcon />
                </Link>
            </div>
        </div>
    )
}