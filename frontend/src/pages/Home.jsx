import React, { useRef } from 'react'
import Header from '../components/Header'
import { IoSearch } from "react-icons/io5";
import Footer from '../components/Footer';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate()
  const playerInputRef = React.useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const playerName = e.target.value.trim();
      navigate(`/general/${playerName}`)
    }
  }

  const handleSearch = () => {
    const playerName = playerInputRef.current.value.trim();
    navigate(`/general/${playerName}`)
  } 


  return (
    <div className='h-[40vh] flex items-center justify-center flex-col gap-10'>
      <Header />
      <p className='text-1xl md:text-3xl'>search for a player's general stats:</p>
        <div className='flex h-14 md:w-[35%] items-center'>
          <input ref={playerInputRef} type="text" placeholder='Search for a player (e.g. ImAbolfazl)' className='w-[80%] text-xl outline-none border border-white/40 rounded-sm p-3' onKeyDown={handleKeyDown}/>
          <div className='w-[20%] text-4xl text-white/50 border-white/40 rounded-sm flex items-center justify-center cursor-pointer' ><IoSearch onClick={handleSearch}/></div>
        </div>
      <Footer/>
    </div>
  )
}

export default Home