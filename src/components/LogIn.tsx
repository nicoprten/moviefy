import React, { useState, useEffect } from 'react';

import { Amplify, API, Auth } from 'aws-amplify';
import awsExports from '../aws-exports';
Amplify.configure(awsExports);

// import { logIn } from './../actions/index';
// import { useDispatch } from 'react-redux';
// import { Dispatch } from 'redux';

export const LogIn = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [user, setUser] = useState<object>({});

    // const dispatch = useDispatch<Dispatch<LogIn>>();


    // const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setEmail(e.target.value)
    // }
    // const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setPassword(e.target.value)
    // }

    // async function handleLogIn(){
    //     try{
    //         const user = await Auth.signIn(email, password);
    //         setUser(user);
    //     }catch(err){
    //         console.log('Error logueando ', err);
    //     }
    // }
    

    // async function handleLogOut(){
    //     try{
    //         await Auth.signOut();
    //         setUser({});
    //     }catch(err){
    //         console.log('Error deslogueando ', err);
    //     }
    // }

    // useEffect(() => {
    //     Auth.currentAuthenticatedUser()
    //     .then(r => setUser(r));
    //     console.log(user)
    // }, [])

    return(
        <div className='flex bg-gray-dark text-white w-80vw mx-auto p-4 mt-8 rounded-sm'>
            <div className='w-6/12'>
                <h2 className='font-bold text-xl my-2'>Log In</h2>
                {Object.keys(user).length > 0 ? <p onClick={() => console.log('log out')}>log out</p> : <p>logueate pa</p>}
                <form className='flex flex-col w-6/12'>
                    <p className='text-gray-light'>Email or username</p>
                    <input className='bg-gray-dark rounded-sm my-2 border-b-2 border-gray focus:outline-none' type='text' name='email' value={email} placeholder='email'/>
                    <p className='text-gray-light'>Password</p>
                    <input className='bg-gray-dark rounded-sm my-2 border-b-2 border-gray focus:outline-none' type='password' name='password' value={password} placeholder='password'/>
                </form>
                <div className='flex flex-col w-6/12 items-center'>
                    <button className='w-full bg-gray-black text-blue font-bold rounded-sm my-2 border-2 border-blue hover:bg-blue hover:text-gray hover:border-blue duration-200'>
                        Log In
                    </button>
                    <p className='text-white'>or</p>
                    <button className='w-full bg-gray-black text-blue font-bold rounded-sm my-2 border-2 border-blue hover:bg-blue hover:text-gray hover:border-blue duration-200'>
                        Create Account
                    </button>
                </div>
                <p className='w-6/12 text-blue text-sm text-center'>You will receive an email when you log in to confirm your account.</p>
            </div>
            <div className='w-6/12'>
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

// const mapStateToProps = (state: any) => {
//     return {
//         userRedux: state.user
//     }
// }

// export default connect(mapStateToProps, { logIn })(LogIn);