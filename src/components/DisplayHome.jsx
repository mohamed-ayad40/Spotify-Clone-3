import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import AlbumItem from './AlbumItem'
import { albumsData, songsData } from '../assets/assets'
import SongItem from './SongItem'
import { PlayerContext } from '../context/PlayerContext'


const DisplayHome = ({user}) => {
  const {songsData, albumsData} = useContext(PlayerContext);
  return (
    <>
    
    <div className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
        <Navbar user={user} />
        <nav className='flex items-center gap-2 mt-4'>
          <NavLink end to="/" className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>All</NavLink>
          <NavLink end to="/music" className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Music</NavLink>
          <NavLink end to="/podcasts" className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Podcasts</NavLink>
        </nav>
        <div className='mb-4'>
            <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
            <div className='flex overflow-auto'>
            {albumsData.map((item, index) => (<AlbumItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />))}
            </div>
        </div>
        <div className='mb-4'>
            <h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
            <div className='flex overflow-auto '>
                {songsData.map((item, index) => (<SongItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />))}
            </div>
        </div>
        </div>
    </>
  )
}

export default DisplayHome