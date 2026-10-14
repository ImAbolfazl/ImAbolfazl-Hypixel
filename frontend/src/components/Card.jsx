import React from 'react'

const Card = ({ label, value, color, dye }) => {
    const colors = {
      cyan: "text-cyan-300",
      red: "text-red-300",
      yellow: "text-yellow-400",
    };

    if(dye){
      return (
        <div className="bg-[#2a2a2a] rounded-xl p-4 border border-white/5 flex items-center flex-col">
          <img src={`${import.meta.env.VITE_BACKEND_URL}/api/player/chestplate?color=${encodeURIComponent(dye)}`} alt="colored chestplate" className='w-30'/>
        </div>
      )
    }

    return (
      <div className="bg-[#2a2a2a] rounded-xl p-4 border border-white/5">
        <p className="text-white/50 text-sm">{label}</p>
        <p className={`text-3xl font-bold mt-1 ${colors[color]}`}>{value}</p>
      </div>
    );
  };

export default Card