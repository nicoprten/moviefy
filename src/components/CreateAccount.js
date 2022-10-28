import React, { useEffect, useState} from 'react';

import { Link } from 'react-router-dom';

import { Auth } from 'aws-amplify';

// ICONS
import { IdentificationBadge, LockKey, EnvelopeSimple, CaretDown } from "phosphor-react";

export default function CreateAccount(){

    const [showAvatars, setShowAvatars] = useState(false);
    const [user, setUser] = useState({
        email: '',
        username: '',
        password: '',
        avatar: ''
    });

    async function signUp() {
        try {
            const userCreated = await Auth.signUp({
                username: user.username,
                password: user.password,
                attributes: {
                    email: user.email,          // optional
                },
                autoSignIn: { // optional - enables auto sign in after user is confirmed
                    enabled: true,
                }
            });
            console.log(userCreated);
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    // CHECKEA SI EL USUARIO ESTA CONFIRMADO
    async function confirmSignUp() {
        try {
          await Auth.confirmSignUp('nicolino', '530951');
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    }

    function handleUser(e){
        // console.log(e.target.tagName);
        if(e.target.tagName === 'IMG'){
            setUser({
                ...user,
                avatar: e.target.src
            })
        }else{
            setUser({
                ...user, 
                [e.target.name]: e.target.value
            }
            )
        }
    }

    useEffect(() =>{
        console.log(user)
    }, [user])

    const avatars_test = [
        {
            id:'das78d8ad7',
            img:'https://i.ibb.co/m0STD1Q/profile-img-02.jpg'
        },
        {
            id:'dasd778a7d',
            img:'https://i.ibb.co/jWPkSxF/profile-img-01.jpg'
        },
        {
            id:'9d5asd786a',
            img:'https://i.ibb.co/zV8Qj5s/profile-img-03.jpg'
        }
    ]

    return(
        <div className='w-80vw m-auto mb-4'>
            <img className='items-center m-auto' src='./icon-moviefy.png' alt='icon of Moviefy' />
            <h2 className='text-white text-sm text-center'>Start sharing your movielists with your new account!</h2>
            <button className='text-white' onClick={() => confirmSignUp()}>CONFIRM SIGN UP</button>
            <div>
                <div className='flex mt-4'>
                    <EnvelopeSimple className='text-gray-light border-b-2 border-gray-light pr-2' size={42} />
                    <input className='bg-black border-b-2 border-gray-light text-blue w-full focus:outline-0' name='email' placeholder='Email' onChange={(e) => handleUser(e)}/>
                </div>
                <div className='flex mt-4'>
                    <IdentificationBadge className='text-gray-light border-b-2 border-gray-light pr-2' size={42} />
                    <input className='bg-black border-b-2 border-gray-light text-blue w-full focus:outline-0' name='username' placeholder='Username' onChange={(e) => handleUser(e)}/>
                </div>
                <div className='flex mt-4'>
                    <LockKey className='text-gray-light border-b-2 border-gray-light pr-2' size={42} />
                    <input className='bg-black border-b-2 border-gray-light text-blue w-full focus:outline-0' name='password' placeholder='Password' type='password' onChange={(e) => handleUser(e)}/>
                </div>
                <button className='flex w-full justify-between items-center bg-gray-dark text-white p-4 mt-4 rounded-lg' onClick={() => setShowAvatars(!showAvatars)}>
                    <p>SELECT AN AVATAR</p>
                    <CaretDown className='text-white' size={32} />
                </button>
                {showAvatars && 
                    <div className='flex bg-gray-dark rounded-lg p-2 my-2'>
                        {avatars_test.map((a) => 
                            <div className='w-4/12 group relative hover:cursor-pointer' key={a.id}>
                                <img className='border-2 border-blue' src={a.img} onClick={(e) => handleUser(e)}/>
                                <p className='absolute bottom-0 left-1 z-10 text-blue bg-gray-dark rounded-t p-2 hidden group-hover:block'>SELECT</p>
                            </div>
                        )}
                    </div>
                }
                <button className='bg-blue text-white p-2 mt-4 w-full' onClick={() => signUp()}>SIGN UP</button>
                <button className='text-white p-2 mt-4 border-2 border-blue w-full'>
                    <Link to='/login'>SIGN IN</Link>
                </button>
            </div>
        </div>
    )
}