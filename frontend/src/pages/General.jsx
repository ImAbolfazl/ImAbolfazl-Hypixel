import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { IoSearch } from "react-icons/io5";

const General = () => {
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState("notLoaded");
  const [searchParams] = useSearchParams();
  const username = searchParams.get("u");
  const navigate = useNavigate()
  const playerInputRef = React.useRef(null);
  const gamemode = window.location.pathname.replaceAll("/", "")
  

  useEffect(() => {
    const getPlayerStats = async () => {
      setLoading("notLoaded")
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/player/stats/${username}`, {headers:{"Authorization": import.meta.env.VITE_BACKEND_AUTH_SECRET}});
        setPlayerStats(response.data);
        setLoading("Loaded");
      } catch {
        setLoading("NoPlayer");
      }
    };
    if(username){
      getPlayerStats();
    }
  }, [username]);  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const playerName = e.target.value.trim();
      navigate(`/${gamemode}/?u=${playerName}`)
    }
  }

  const handleSearch = () => {
    const playerName = playerInputRef.current.value.trim();
    navigate(`/${gamemode}/?u=${playerName}`)
  } 

  if(!username){
    return (
      <div className='h-[40vh] flex items-center justify-center flex-col gap-10'>
        <Header/>
        <p className='text-1xl md:text-3xl'>search for a player's {gamemode} stats:</p>
          <div className='flex h-14 md:w-[35%] items-center'>
            <input ref={playerInputRef} type="text" placeholder='Search for a player (e.g. ImAbolfazl)' className='w-[80%] text-xl outline-none border border-white/40 rounded-sm p-3' onKeyDown={handleKeyDown}/>
            <div className='w-[20%] text-4xl text-white/50 border-white/40 rounded-sm flex items-center justify-center cursor-pointer' ><IoSearch onClick={handleSearch}/></div>
          </div>
        <Footer/>
      </div>
    )
  }
}

export default General