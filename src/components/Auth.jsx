import React, { useEffect, useState } from 'react'
import { assets } from "../assets/assets";
import LoginForm from './LoginForm';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
// import { signInWithGoogle } from '../Api/SendRequest';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUpForm from './SignUpForm';
import "./loading.css";

const Auth = () => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const loginPage = location.pathname === "/login";



    // const googleAuth = () => {
    //     window.open(
    //         "http://localhost:4000/auth/google/callback",
    //         "_self"
    //     )
    // };

    const loginWithGoogle = () => {
        // window.open("http://localhost:4000/auth/google/callback", "_self");
        window.open("https://spotify-clone-server-tau.vercel.app/auth/google", "_self")  
    };
    useEffect(() => {
        setIsLoading(false);
    }, []);
  return (
    isLoading ? (
    <div className="col-3">
        <div className="snippet" data-title="dot-elastic">
          <div className="stage">
            <div className="dot-elastic"></div>
          </div>
        </div>
    </div>
    ) :

        <div className='bg-gradient-to-b from-[#292929] align-center to-[#000000] h-[100vh] flex flex-col'>
            <div className='relative top-[50%] left-[50%] align-center text-center justify-center translate-x-[-50%] translate-y-[-50%] w-[326px] lg:w-[734px] bg-[#121212] h-[977px]'>
                <div className='flex justify-center'>
                    <img className='w-[50px] m-10 h-[50px]' src={assets.spotify_logo} alt="" />
                </div>
                <div className='flex justify-center'>
                    <h1 className={`text-white  text-center font-bold ${!loginPage ? "w-[300px] text-[40px]" : "text-[32px]"}`}>{loginPage ? "Log in to Spotify" : "Sign up to start listening"}</h1>
                </div>

                    <div className='flex justify-center m-10'>
                    {/* <GoogleLogin
                        clientId="978477691213-r9121h0kt0cr1vsgifmplolm9iv47lg3.apps.googleusercontent.com"
                        buttonText="Sign in with Google"
                        onSuccess={async credentialResponse => {
                            setIsLoading(true);
                            setError(null);
                            try {
                                console.log(credentialResponse);
                                const decoded = jwtDecode(credentialResponse?.credential);
                                console.log(decoded)
                                const results = signInWithGoogle(decoded)
                                setUser(results.user);
                                navigate("/")
                            } catch (err) {
                                setError(error.message);
                                setIsLoading(false);
                            }
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />; */}
                    <div>
                        <div onClick={loginWithGoogle}  className='cursor-pointer w-[310px] justify-center text-white flex gap-x-2 bg-black border py-3 rounded-full '>
                            <img className='flex start-2 h-auto w-5' src={assets.googleImg} alt="" />
                            <div>Sign with google</div>
                        </div>
                    </div>
                    </div>


                <hr />
                <div>
                    {loginPage ? <LoginForm /> : <SignUpForm />}
                    
                </div>
            </div>
        </div>

  )
}

export default Auth