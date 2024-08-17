import React, { useContext, useEffect, useState } from 'react'
import { signIn } from '../Api/SendRequest';
import { Link, useNavigate } from 'react-router-dom';
import { ReactContext } from '../context/UserContext';

const LoginForm = () => {
    const {user, setUser} = useContext(ReactContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        email: "",
        password: ""
    });
    useEffect(() => {
        console.log(user);
        console.log("User changed in auth!");
    }, [user]);
    const handleChange = (e) => {
        setValues((prevValue) => {
            return {...prevValue, [e.target.name]: e.target.value};
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const results = await signIn(values);
            console.log(results);
            if(results) {
                console.log("Results");
                setUser(results);
                if(results) navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //       const results = await signIn(formData); // Pass formData as an argument
    //       console.log(results); // Now results will contain the user data (if successful)
    //       // Handle successful login based on results (e.g., store user data, redirect)
    //     } catch (err) {
    //       console.error(err); // Handle login errors
    //     }
    //   };
  return (
    loading ?
        <div className="col-3 flex justify-center items-center">
            <div className="snippet" data-title="dot-elastic">
            <div className="stage">
                <div className="dot-elastic bg-[#1ed760]"></div>
            </div>
            </div>
        </div> 
        : 
    <form className='flex justify-center flex-wrap' onSubmit={handleSubmit}>
        <div className='formInput mt-10 w-[300px] '>
            <div className='mb-5 flex flex-wrap'>
                <label htmlFor="username" className='text-white w-fit block font-bold text-[0.875rem]'>
                    Email: 
                </label>
                <input className='text-white mt-2 border bg-transparent text-[1rem] rounded-[4px] w-[300px] px-4 py-2' placeholder='Email' name="email" value={values.username} id="username" type="email" onChange={(e) => handleChange(e)} />
            </div>

            <div className='mb-5 flex flex-wrap'>
                <label htmlFor="password" className='text-white w-fit block font-bold text-[0.875rem]'>Password</label>
                <input className='text-white mt-2 border bg-transparent text-[1rem] rounded-[4px] w-[300px] px-4 py-2' placeholder='Password' name="password" value={values.password} id="password" type="password" onChange={(e) => handleChange(e)} />
            </div>

            <div className='mb-5 flex flex-wrap w-full justify-center'>
                <button className='hover:scale-105 text-black w-[300px] font-bold rounded-full py-[12px] px-[16px] bg-[#1ed760]' type="submit">Log In</button>
            </div>

            <a className='mb-5 flex text-white underline flex-wrap w-full justify-center hover:text-[#1ed760]' href="">Forgot your password?</a>

            <br />
            <div className="text-white flex items-center">
                <span>Don't have an account? </span>
                <Link to="/signup" className="text-white relative left-2 underline font-[400] hover:text-[#1ed760]"> Sign up for Spotify</Link>
            </div>
        </div>
        
    </form>
  )
}

export default LoginForm;