import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'
import { useLocation } from 'react-router-dom';


const SongItem = ({name, image, desc, id}) => {
  const location = useLocation();
  const searchPage = location.pathname === "/search";

  const {playWithId, track} = useContext(PlayerContext);
  return (
    <div onClick={() => playWithId(id)} className={`${!searchPage ? "min-w-[180px] hover:bg-[#ffffff26]" : "w-full flex gap-6 h-12"} 'p-2 px-3 rounded cursor-pointer' `}>
        <img className='rounded' src={image} alt="" />
        <div className='flex flex-col justify-center'>
          <p className={`'font-bold  mb-1 ${!searchPage && "mt-2"} '`}>{name}</p>
          <p className='text-slate-200 text-sm'>{desc}</p>
        </div>
    </div>
  )
}

export default SongItem