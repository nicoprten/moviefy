import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logIn } from './../actions/index';
import { useDispatch, useSelector, connect } from 'react-redux';

import { Amplify, API, Auth } from 'aws-amplify';
import awsExports from '../aws-exports';
Amplify.configure(awsExports);


const LogIn = () => {
    // console.log(currentUser)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [currentUser, setCurrentUser] = useState({});

    const dispatch = useDispatch();
    // const user = useSelector(state => state.user);


    function handleChangeUser(e){
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        }else{
            setPassword(e.target.value)
        }
    }

    async function handleLogIn(){
        try{
            const user = await Auth.signIn(email, password);
            setCurrentUser(user);
        }catch(err){
            console.log('Error logueando ', err);
        }
    }

    useEffect(() => {
        // CHECKEAR USER LOGUEADO
        Auth.currentAuthenticatedUser()
        .then((r) => {setCurrentUser(r); console.log(r)});
    }, [])

    console.log(currentUser)

    return(
        <div className='md:flex-row flex flex-col justify-items-center bg-gray-dark text-white w-80vw mx-auto p-4 mt-8 rounded-sm'>
            <div className='w-full md:w-6/12'>
                <h2 className='font-bold text-xl my-2'>Log In</h2>
                {Object.keys(currentUser).length > 0 ? <p onClick={() => console.log('log out')}>log out</p> : <p>logueate pa</p>}
                <form className='flex flex-col'>
                    <p className='text-gray-light'>Email or username</p>
                    <input className='bg-gray-dark rounded-sm my-2 border-b-2 border-gray focus:outline-none' type='text' name='email' value={email} placeholder='email' onChange={(e) => handleChangeUser(e)}/>
                    <p className='text-gray-light'>Password</p>
                    <input className='bg-gray-dark rounded-sm my-2 border-b-2 border-gray focus:outline-none' type='password' name='password' value={password} placeholder='password' onChange={(e) => handleChangeUser(e)}/>
                </form>
                <div className='flex flex-col items-center'>
                    <button className='w-full bg-gray-black text-blue font-bold rounded-sm my-2 border-2 border-blue hover:bg-blue hover:text-gray hover:border-blue duration-200' onClick={() => handleLogIn()}>
                        Log In
                    </button>
                    <p className='text-white'>or</p>
                    <Link className='w-full bg-gray-black text-blue font-bold text-center rounded-sm my-2 border-2 border-blue hover:bg-blue hover:text-gray hover:border-blue duration-200' to='/createaccount'>
                        Create Account
                    </Link>
                </div>
                <p className='text-blue text-sm text-center'>You will receive an email when you log in to confirm your account.</p>
            </div>
            <div className='w-full mt-4 md:ml-8 md:w-6/12 '>
                <h2 className='font-bold text-xl my-2'>Here goes instructions / benefits of being logged</h2>
                <h3 className='font-bold'>We keep an eye on the premieres for you</h3>
                <p className='pl-2 my-2 border-l-2 border-gray-light'>We show you all the movies that have been released and also the upcoming ones.</p>
                <h3 className='font-bold'>Your Watchlist</h3>
                <p className='pl-2 my-2 border-l-2 border-gray-light'>Track everything you want to watch and receive e-mail when movies open in theaters.</p>
                <h3 className='font-bold'>Your Ratings</h3>
                <p className='pl-2 my-2 border-l-2 border-gray-light'>Leave a rating with a review to let others know what you think about the movie.</p>
                <h3 className='font-bold'>Share your movielists</h3>
                <p className='pl-2 my-2 border-l-2 border-gray-light'>When a frind ask you for a movie to watch just send him one of your multiple movielists.</p>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user
    }
}

export default connect(mapStateToProps, { logIn })(LogIn);