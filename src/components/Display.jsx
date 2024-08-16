import React, { useContext, useEffect, useRef, useState } from 'react'
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Player from './Player'
import axios from "axios";
import MyContext from "../context/AlbumContext";
import { PlayerContext } from '../context/PlayerContext'
import { ReactContext } from '../context/UserContext'
import { getcurrentSong, updateCurrentSong } from '../Api/SendRequest';
const Display = () => {

  const {user, setUser} = useContext(ReactContext);
  const [value, setValue] = useState({isAlbum: false, bgColor: undefined});
  const handleUpdate = (newValue) => {
    setValue(newValue);
  };
  const url = "http://localhost:4000";
  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null);
  const audioRef = useRef();
  const seekBg = useRef();
  const [mute, setMute] = useState(false);
  const seekBar = useRef();
  const [playStatus, setPlayStatus] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [previousVolume, setPreviousVolume] = useState(0.5);
  const [repeat, setRepeat] = useState(false);
  const [currentSong, setCurrentSong] = useState({
    id: "",
    name: ""
  });
  const [loading, setLoading] = useState(false);
  const fetchingCurrentSong = async () => {
    const response = await getcurrentSong();
    console.log(response);
    const {id, name} = response.data;
    setCurrentSong({
      id,
      name
    });
  };
  const getUser = async () => {
    try {
      setLoading(true);
      console.log(currentSong);
      const response = await axios.get("http://localhost:4000/login/success", {withCredentials: true});
      setUser(response.data.user);
      setLoading(false);
    } catch (err) {
      console.log(err)
      console.log(err.response.data.message);
      setUser(null);
      setLoading(false);
    }
  }
  const handler = () => {
    if(!currentSong) {
      setTrack(songsData[0])
    }
  };
  useEffect(() => {
    pause();
    fetchingCurrentSong();
    getUser();
    getAlbumsData();
    getSongsData();
    handler();
  }, []);
  useEffect(() => {
    const handleKeyPress = (e) => {
      console.log(e);
      if(e.code === "Space") {
        console.log(playStatus)
        if(!playStatus) play();
        if(playStatus) pause();
      };
    };
    songsData.filter((item, index) => {
      if(item._id === currentSong.id) {
        setTrack(item);
        window.addEventListener("keydown", handleKeyPress);
        
      }
    });
    console.log(currentSong);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    }
  }, [currentSong, playStatus]);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0
    },
    totalTime: {
      second: 0,
      minute: 0
    }
  });
  const timeUpdateRef = useRef(null);


const handleMuteButton = () => {
  setMute((prevState) =>!prevState);
  setVolume((prevState) => mute ? previousVolume : 0);
};

const handleVolumeChange = (e) => {
  setVolume(parseFloat(e.target.value));
  setPreviousVolume(e.target.value);
  if(e.target.value == 0) {
      setMute(true);
  } else if(e.target.value > 0) {
      setMute(false);
  }
};



useEffect(() => {
  if (audioRef.current) {
    const handleTimeUpdate = () => {
      if (!timeUpdateRef.current) {
        if(audioRef.current.duration == audioRef.current.currentTime) {
          return setPlayStatus(false);
        };
        timeUpdateRef.current = requestAnimationFrame(() => {
          seekBar.current.style.width = `${(audioRef.current.currentTime / audioRef.current.duration) * 100}%`
          audioRef.current.volume = volume;
          setTime({
            currentTime: {
              second: String(Math.floor(audioRef.current.currentTime % 60)).padStart(2, '0'),
              minute: String(Math.floor(audioRef.current.currentTime / 60))
            },
            totalTime: {
              second: String(Math.floor(audioRef.current.duration % 60)).padStart(2, '0'),
              minute: String(Math.floor(audioRef.current.duration / 60))
            }
          });
          timeUpdateRef.current = null;
        }); // Update every 100 milliseconds (adjust as needed)
        timeUpdateRef.current = null;
      }
    };
    audioRef.current.addEventListener('loadeddata', handleTimeUpdate);
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      if(audioRef.current) {
        audioRef.current.removeEventListener('loadeddata', handleTimeUpdate);
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);   
      }

      clearTimeout(timeUpdateRef.current);
    };
  }
}, [audioRef, volume]);


  const playWithId = async (id) => {
    console.log(id);
    console.log(songsData);
    await songsData.map((item, index) => {
      if(id == item._id) {
        console.log(item._id)
        setTrack(item);
        updateCurrentSong({
          id: item._id,
          name: item.name
        });
      }
    })
    await audioRef.current.play();
    setPlayStatus(true);      
  };

  const previous = async() => {

    songsData.map(async(item, index) => {
      if(item._id == track._id && index > 0) {
        await setTrack(songsData[index - 1]);
        await audioRef.current.play();
        setPlayStatus(true);
      };
    });
  };

  const next = async() => {
    songsData.map(async (item, index) => {
      if(item._id == track._id && (index < songsData.length - 1)) {
        await setTrack(songsData[index + 1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    });
  };

  const seekSong = async (e) => {
    const clickedPosition = e.nativeEvent.offsetX; // Get click position on the seek bar
    const seekBarWidth = seekBg.current.offsetWidth;
    const seekPercentage = clickedPosition / seekBarWidth;
    const newCurrentTime = audioRef.current.duration * seekPercentage;
    audioRef.current.currentTime = newCurrentTime;
    // audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * 100)
  };

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  }
  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };
  
  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.songs);
      console.log(response)
    } catch (err) {
      console.log(err);
    };
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.allAlbums);
    } catch (err) {
      console.log(err);
    }
  };

  
  const contextValue = {
      audioRef,
      seekBg,
      seekBar,
      track, setTrack,
      playStatus, setPlayStatus,
      time, setTime,
      play, pause,
      playWithId,
      previous, next,
      seekSong,
      songsData, setSongsData, albumsData,
      volume, setVolume,
      mute, setMute,
      handleMuteButton,
      handleVolumeChange,
      repeat, setRepeat
  };

  return (
    <>
      <PlayerContext.Provider value={contextValue}>
          <div className="bg-black h-screen">
            {loading && 
              <div className="col-3">
                  <div className="snippet" data-title="dot-elastic">
                    <div className="stage">
                      <div className="dot-elastic"></div>
                    </div>
                  </div>
              </div>
            }
            {songsData.length !== 0 && 
            <>
              <div className="h-[90%] flex">
                <Sidebar />
                <MyContext.Provider value={{value, handleUpdate}}>
                  <Outlet />
                </MyContext.Provider>
              </div>
              <Player handleMuteButton={handleMuteButton} />
            </>}
            <audio ref={audioRef} src={track ? track.file : ""} preload='auto'></audio>
          </div>
        </PlayerContext.Provider>
    </>
  )
}

export default Display