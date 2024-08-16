import React, { useContext, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import { albumsData, songsData } from '../assets/assets';
import { assets } from '../assets/assets';
import Context from '../context/AlbumContext';
import { PlayerContext } from '../context/PlayerContext';
import { useState } from 'react';

const DisplayAlbum = () => {
  const context = useContext(Context);
  const {playWithId, albumsData, songsData} = useContext(PlayerContext);

  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";

  // const bgColor = isAlbum ? albumsData.find((x) =>{ (x._id == albumId)}).bgColor : "#121212";
  const bgColor = isAlbum && albumsData.length > 0 ? albumsData.find((item) => (item._id == albumId)).bgColor : "#121212";

  const [albumData, setAlbumData] = useState("");
  const displayRef = useRef();
  useEffect(() => {
    if(isAlbum) {
      context.handleUpdate({isAlbum, bgColor});
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  }, []);

  const {id} = useParams();
  useEffect(() => {
    albumsData.map((item) => {
      if(item._id === id) {
        setAlbumData(item);
      }
    })
  })

  // const albumSelf = albumsData.find((album) => (album._id == Number(albumId)));
  // console.log(albumSelf)
  return (
    <>
      <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
        <Navbar /> 
        {albumsData.length > 0 && 
        <>
          <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
          <img className='w-48 rounded' src={albumData.image} alt="" />
          <div className='flex flex-col'>
            <p>Playlist</p>
            <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
            <h4>{albumData.desc}</h4>
            <p className='mt-1'>
              <img className='inline-block w-5' src={assets.spotify_logo} alt="" />
              <b>Spotify </b>
              • 1,323,154 likes
              • <b>50 songs, </b>
              about 2 hr 30 min
            </p>
          </div>
        </div>
        <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
          <p><b className='mr-4'>#</b>Title</p>
          <p>Album</p>
          <p className='hidden sm:block'>Date Added</p>
          <img className='m-auto w-4' src={assets.clock_icon} alt="" />
        </div>
        <hr />
        {songsData.filter((item) => (item.album == albumData.name)).map((item, index) => (
          <div onClick={() => playWithId(item._id)} key={index} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
            <p className='text-white'>
              <b className='mr-4 text-[#a7a7a7]'>{index+1}</b>
              <img className='inline w-10 mr-5' src={item.image} alt="" />
              {item.name}
            </p>
            <p className='text-[15px]'>{albumData.name}</p>
            <p className='text-[15px] hidden sm:block'>5 Days ago</p>
            <p className='text-[15px] text-center'>{item.duration}</p>
          </div>
        ))}
        </>
        }

        
      </div>
    </>
  )
}

export default DisplayAlbum