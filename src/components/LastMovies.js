import React, { MouseEvent, useRef } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



import { Amplify, API, Auth } from 'aws-amplify';
import awsExports from '../aws-exports';
Amplify.configure(awsExports);

// COMPONENTS
import MovieCard from './MovieCard';

// ICONS
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const LastMovies = () => {

    const [lastMovies, setLastMovies] = useState([]);
    console.log(lastMovies)

    const sliderRef = useRef(null);

    const dateNow = new Date();
    const dateNextWeek = new Date(new Date().setDate(new Date().getDate() + 7));

    let releaseDateNow = `${dateNow.getFullYear()}-${parseDate(dateNow.getMonth() + 1)}-${parseDate(dateNow.getDate())}`;
    let releaseDateNextWeek = `${dateNextWeek.getFullYear()}-${parseDate(dateNextWeek.getMonth() + 1)}-${parseDate(dateNextWeek.getDate())}`;

    // Example: 8 => return 08
    function parseDate(date) {
        const newDate = date < 10 ? `0${date}` : date;
        return newDate;
    }

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${releaseDateNow}&primary_release_date.lte=${releaseDateNextWeek}&api_key=5a124b627856216bf209486ade0bc869`)
        .then(r => r.data)
        .then(d => setLastMovies(d.results))
    }, [])

    const handleBackSlide = (e) => {
        sliderRef.current.scrollLeft -= sliderRef.current.clientWidth;
    }
    
    const handleNextSlide = (e) => {
        sliderRef.current.scrollLeft += sliderRef.current.clientWidth;
    }

    // useEffect(() =>{
    //     fetchMovies()
    // },[])

    // const fetchMovies = async () => {
    //     const allMovies = await API.graphql({
    //         query: `query MyQuery {
    //             listMovies { 
    //               items {
    //                 id
    //                 movie_id
    //                 movie_name
    //                 user_id
    //                 Comments {
    //                   items {
    //                     id
    //                     info
    //                     movieID
    //                     user_id
    //                   }
    //                 }
    //               }
    //             }
    //           }`,
    //         authMode:'API_KEY'
    //     });

    //     console.log('MOVIES COMMENTED', allMovies);
    // }

    useEffect(() => {
        // TRAERME TODAS LAS MOVIELIST
            const initGet = {
                headers: {},
                response: true,
                queryStringParameters: {
                    userIdent : '35767e13-cf1b-4fdd-b434-bd4dd0740ba9'
                }
            }
    
            API.get('MovieFyAPI', '/movieList', initGet)
            .then(r => {console.log('LO QUE VIENE DE AWS',r.data.data.Items);})
            .catch(e => {console.log(e)})  
    },[]);

    // AGREGA MOVIE A MOVIELIST (Hay que enviar por body id de ML, user_id y MovieID dentro de un ARRAY como string)

    async function addMovieHandler() {
        const init = {
            body:{
                movieListId : '1kqiphyvb23l9rgfvwt', 
                userId : '35767e13-cf1b-4fdd-b434-bd4dd0740ba9', 
                newMovie : ['764567']
            }
        };
        const newMovie = await API.put('MovieFyAPI','/movie', init);
        console.log(newMovie);
    };

    // CREAR MOVIE LIST
    async function createMovieList(){
        const newMovieList = {
            body:{
                name: 'movie list test niko',
                userId: '35767e13-cf1b-4fdd-b434-bd4dd0740ba9'
            }
        };
        const movieList = await API.post('MovieFyAPI', '/movieList', newMovieList);
        console.log(movieList);
    }

    //BORRA MOVIELIST (Hay que enviar user_id y id de ML)
    async function deleteMovieListHandler(){
        try {
            const deleteInfo = {
                body : {
                    movieListId : 'xlsfam5dfyl9nkqzmc',
                    userId : '7036d9d5-6a84-4a97-bb1f-f432297c01d4',
                }
            }

            const deletedMovieList = await API.post('MovieFyAPI', '/movieList/delete',deleteInfo);
            console.log(deletedMovieList);

        }catch (e){
            console.log(e)
        }
    };

    // SACA MOVIE DE MOVIELIST (Hay que enviar por body index del array de la movie a eliminar, con id de ML y de user)

    async function deleteMovieHandler(){
        const init = {
            body:{
                itemIndex: '',
                id: '',
                user_id: ''
            }
        };
        const deletedMovie = await API.post('MovieFyAPI','/movie', init);
        console.log('DELETE SUCCESS',deletedMovie);
    };

    return(
        <div className="w-80vw mx-auto my-4">
            <button onClick={() => createMovieList()}>
                create movie list
            </button>
            <button className='block' onClick={() => addMovieHandler()}>
                add movie to a movie list
            </button>
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