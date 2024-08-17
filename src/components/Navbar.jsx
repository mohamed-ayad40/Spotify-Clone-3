import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import {ReactContext} from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { PlayerContext } from '../context/PlayerContext';
import SongItem from './SongItem';

const Navbar = ({searchTerm, setSearchTerm, handleInputChange}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {user} = useContext(ReactContext);
  console.log(user);
  const mainInfo = useContext(PlayerContext);
  const songs = mainInfo.songsData;
  const searchPage = location.pathname === "/search";
  const canGoBack = location.pathname === "/";
  const canGoForward = location.pathname !== "/"
  const logout = () => {
    window.open("http://localhost:4000/api/user/logout", "_self");
  };

  return (
    <>
        <div className='w-full flex justify-between items-center font-semibold '>
            <div className='flex items-center gap-2'>
                <img onClick={() => navigate(-1)} className={`${canGoBack ? "cursor-not-allowed opacity-40" : "cursor-pointer"} w-8 bg-black p-2 rounded-2xl`} src={assets.arrow_left} alt="" />
                <img onClick={() => navigate(1)} className={`${canGoForward ? "cursor-not-allowed opacity-40" : "cursor-pointer"} w-8 bg-black p-2 rounded-2xl`} src={assets.arrow_right} alt="" />
                {
                  searchPage 
                  &&
                  <form autoComplete="off">
                    <fieldset className='relative'>
                      <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute left-4 p transform -translate-y-2 top-2/4 text-gray-400' />
                      <input value={searchTerm} onChange={handleInputChange} className='w-[300px] px-11 text-[13px] font-bold h-[48px] rounded-full bg-[#242424]' type="search" placeholder='What do you want to play?' name="search" id="search" /> 
                    </fieldset>
                  </form>
                }
            </div>
            <div className='flex items-center gap-4'>
            {
              user ?
                <>
                  <p className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer'>Explore Premium</p>
                  <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer'>Install App</p>
                  <p className='bg-purple-500 text-black w-8 h-8 rounded-full flex items-center justify-center transition-all border-4 border-black hover:scale-105 duration-50 cursor-pointer'>{user.fullName?.slice(0, 1) || user?.email?.slice(0, 1).toUpperCase()}</p>
                  <button className='text-white bg-black w-[80px] transition-all hover:scale-105 duration-50 h-[40px] rounded-full cursor-pointer' onClick={logout}>Logout</button>
                </> 
                :
                <>
                  <Link to="/signup" className='text-[#b3b3b3] px-10 py-6 rounded font-bold cursor-pointer transition-transform duration-2000 ease-in-out	hover:scale-105 hover:text-white'>Sign up</Link>
                  <Link to="/login" className='text-black px-7 py-4 rounded-full font-bold cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 bg-white'>Log in</Link>
                </>
            }
            </div>
            
        </div>
    </>
  )
}

export default Navbar