import React, { useContext, useEffect, useRef, useState } from 'react';
import {assets, songsData} from "../assets/assets";
import { PlayerContext } from '../context/PlayerContext';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCheckSquare, faCoffee, faVolumeXmark, faRotateLeft, fa1, fa2, faShuffle } from '@fortawesome/free-solid-svg-icons'

const Player = () => {
    const { songsData, setSongsData, audioRef, track, setTrack, seekBar, seekBg, playStatus, setPlayStatus, play, pause, time, previous, next, seekSong, volume, setVolume, mute, setMute, handleMuteButton, handleVolumeChange, repeat, setRepeat } = useContext(PlayerContext);
    const rangeInputRef = useRef();
    const [isShuffled, setIsShuffled] = useState(false);
    const shuffle = () => {
        setIsShuffled((prevValue) => {
            return !prevValue;
        });
        if(!isShuffled) {
            const shuffledSongs = [...songsData];
            for (let i = songsData.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));

                [shuffledSongs[i], shuffledSongs[j]] = [shuffledSongs[j], shuffledSongs[i]];
            };
            setSongsData(shuffledSongs);
            setTrack(shuffledSongs[0]);
        }
    };
    useEffect(() => {
        if(rangeInputRef.current) {
            rangeInputRef.current.style.setProperty('--thumb-size', '0', 'important');
        };
    }, [volume, audioRef]);
    useEffect(() => {
        if(isShuffled) {
            play();
        }
    }, [isShuffled]);
    useEffect(() => {
        // console.log(track)
        if(repeat && audioRef.current.duration == audioRef.current.currentTime) {
                setPlayStatus(true);
                audioRef.current.play();
                return;
        } else {
            // console.log("No repeat")
        }
    }, []);

  return track || track != null ? (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
        <div className="hidden lg:flex items-center gap-4">
            <img className='w-12' src={track.image} alt="" />
            <div>
                <p>{track.name}</p>
                <p>{track?.desc?.slice(0, 12)}</p>
            </div>
        </div>
        <div className='flex flex-col items-center gap-1 m-auto'>
            <div className="flex gap-4">
                {/* <img className='w-4  cursor-pointer' src={assets.shuffle_icon} alt="" /> */}
                <div onClick={shuffle} style={{lineHeight: "0", color: isShuffled && "#166534"}} className='cursor-pointer'>
                    <FontAwesomeIcon icon={faShuffle} />
                </div>
                <img onClick={previous} className='w-4 h-full cursor-pointer' src={assets.prev_icon} alt="" />
                {
                    playStatus ? <img className='w-4 h-full cursor-pointer' onClick={pause} src={assets.pause_icon} alt="" />
                    :
                     <img className='w-4 h-full cursor-pointer' onClick={play} src={assets.play_icon} alt="" />
                }
                
                
                <img onClick={next} className='h-full w-4 cursor-pointer' src={assets.next_icon} alt="" />
                <div onClick={() => setRepeat((prevState) => !prevState)} style={{lineHeight: "0"}} className='w-4 cursor-pointer'>
                    <FontAwesomeIcon style={{lineHeight: "0", color: repeat && "#166534"}} className='w-4 h-full' icon={faRotateLeft} />
                </div>
                
            </div>
            <div className='flex items-center gap-2'>
                <p className='text-[#a8a8a9] text-[12px] '>{audioRef.current.duration ? (`${time?.currentTime?.minute}:${time?.currentTime?.second}`) : '-:--'}</p>
                <div onClick={seekSong} ref={seekBg} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                    <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full' />
                </div>
                <p className='text-[#a8a8a9] text-[13px]'>{audioRef.current.duration ? (`${time?.totalTime?.minute}:${time?.totalTime?.second}`) : '-:--'}</p>
            </div>
        </div>
        <div className='hidden lg:flex items-center gap-2 opacity-75'>
            <img className='w-4' src={assets.plays_icon} alt="" />
            <img className='w-4' src={assets.mic_icon} alt="" />
            <img className='w-4' src={assets.queue_icon} alt="" />
            <img className='w-4' src={assets.speaker_icon} alt="" />
            <div className='cursor-pointer' onClick={handleMuteButton}>
            {mute ? <FontAwesomeIcon icon={faVolumeXmark} /> : <img className='w-4' src={assets.volume_icon} alt="" />}
            </div>
            <input ref={rangeInputRef} onChange={handleVolumeChange} min="0" max="1" step="0.01" className='h-1 appearance-none bg-gray-300 rounded-full cursor-pointer w-24 ' type="range" name="" id="" />
            <img className='w-4' src={assets.mini_player_icon} alt="" />
            <img className='w-4' src={assets.zoom_icon} alt="" />
        </div>
    </div>
  ): null
}

export default Player