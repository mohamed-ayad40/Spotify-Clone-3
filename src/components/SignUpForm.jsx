import React, { useState } from 'react'
import { signUp } from '../Api/SendRequest';
import { Link, useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errorMessages, setErrorMessages] = useState(null);
    const handleChange = (e) => {
        setValues((prevValue) => {
            return {...prevValue, [e.target.name]: e.target.value}
        });
        if (e.target.name === 'confirmPassword') {
            if (e.target.value !== values.password) {
              setErrorMessages('Passwords do not match!');
            } else {
              setErrorMessages(null); // Clear error if passwords match
            }
          }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (values.password !== values.confirmPassword) {
            setErrorMessages('Passwords do not match!');
            return; // Prevent form submission if passwords don't match
          } else {
            const result = await signUp(values); 
            if(result.status == 201) {
                navigate("/");
            }
          }
    };
  return (
    <div>
        <form className='flex justify-center flex-wrap' onSubmit={handleSubmit}>
        <div className='formInput mt-10 w-[300px] '>

            <div className='mb-5 flex flex-wrap'>
                <label htmlFor="username" className='text-white w-fit block font-bold text-[0.875rem]'>
                    Your email: 
                </label>
                <input className='text-white mt-2 border bg-transparent text-[1rem] rounded-[4px] w-[300px] px-4 py-2' placeholder="name@domain.com" name="email" value={values.email} id="username" type="email" onChange={(e) => handleChange(e)} />
            </div>

            <div className='mb-5 flex flex-wrap'>
                <label htmlFor="password" className='text-white w-fit block font-bold text-[0.875rem]'>You new password:</label>
                <input className='text-white mt-2 border bg-transparent text-[1rem] rounded-[4px] w-[300px] px-4 py-2' placeholder='Password' name="password" value={values.password} id="password" type="password" onChange={(e) => handleChange(e)} />
            </div>

            <div className='mb-5 flex flex-wrap'>
                <label htmlFor="password" className='text-white w-fit block font-bold text-[0.875rem]'>Confirm password:</label>
                <input pattern={values.confirmPassword} className='text-white mt-2 border bg-transparent text-[1rem] rounded-[4px] w-[300px] px-4 py-2' placeholder='Password' name="confirmPassword" value={values.confirmPassword} id="confirmPassword" type="password" onChange={(e) => handleChange(e)} />
                <span className={'text-red-600'}>{errorMessages}</span>
            </div>

            <div className='mb-10 flex flex-wrap'>
                <input type="checkbox" name="checkbox" value="true" id="checkbox" />
                <label className='text-white ml-3 text-[1em]' htmlFor="checkbox">Remember me</label>
            </div>

            <div className='mb-5 flex flex-wrap w-full justify-center'>
                <button className='hover:scale-105 text-black w-[300px] font-bold rounded-full py-[12px] px-[16px] bg-[#1ed760]' type="submit">Sign up</button>
            </div>

            <div>
            <div className='mb-5 flex text-white flex-wrap w-full justify-center gap-2'>
            <div>Already have an account?</div>
                <Link to="/login" className='underline hover:text-[#1ed760]'>Log in here</Link>
            </div>
            </div>
            {/* <Link className='mb-5 flex text-white underline flex-wrap w-full justify-center hover:text-[#1ed760]' href="">Already have an account? <span>Log in here</span></Link> */}

            <hr />

        </div>
        
    </form>
    </div>
  )
}

export default SignUpForm