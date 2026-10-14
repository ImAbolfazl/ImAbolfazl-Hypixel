import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import OneTimeAchievement from "../components/OneTimeAchievement";
import TieredAchievement from "../components/TieredAchievement";
import QuestCard from "../components/QuestCard";
import { IoSearch } from "react-icons/io5";
import Footer from "../components/Footer";

const Stats = () => {
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState("notLoaded");
  const [selectedType, setSelectedType] = useState("Human");
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

  const getValue = (val) => (val === null || val === undefined || val === "" ? "-" : val);
  

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
        <Header />
        <p className='text-1xl md:text-3xl'>search for a player's {gamemode} stats:</p>
          <div className='flex h-14 md:w-[35%] items-center'>
            <input ref={playerInputRef} type="text" placeholder='Search for a player (e.g. ImAbolfazl)' className='w-[80%] text-xl outline-none border border-white/40 rounded-sm p-3' onKeyDown={handleKeyDown}/>
            <div className='w-[20%] text-4xl text-white/50 border-white/40 rounded-sm flex items-center justify-center cursor-pointer' ><IoSearch onClick={handleSearch}/></div>
          </div>
        <Footer/>
      </div>
    )
  }

  if (loading === "notLoaded") {
    return (
      <>
        <Header />
        <div className="h-screen bg-[#121212] flex items-center justify-center text-white text-2xl">
          Loading...
        </div>
      </>
    );
  }

  if (loading === "NoPlayer") {
    return (
      <>
        <Header />
        <div className="h-screen bg-[#121212] flex items-center justify-center text-white text-2xl">
          stats for {username} were not found.
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="h-screen text-white pt-4 md:pt-36 px-8 md:overflow-hidden">
        <div className="h-full max-w-7xl mx-auto flex gap-8 flex-col md:flex-row items-center">
          <div className="w-72 flex flex-col items-center shrink-0 mt-10">
            <img
              src={`https://skins.mcstats.com/body/front/${playerStats.uuid}`}
              className="h-80 drop-shadow-2xl md:block hidden"
              alt="player skin"
            />
            <div className="text-3xl pt-4" style={{ color: playerStats.rank?.displayColor || "#ffffff" }}>
              {playerStats.rank && <span>[{playerStats.rank.rank}</span>}
              <span style={{ color: playerStats.rank?.plusColor }}>{playerStats.rank?.plus}</span>
              {playerStats.rank && <span>] </span>}
              <span>{playerStats.username}</span>
            </div>

            <div className="mt-6 w-full flex flex-col gap-3 items-center">
              <div className="bg-[#212121] rounded-xl p-4 border border-white/10">
                <p className="text-white/50 text-sm">Most Vampires Killed</p>
                <p className="text-red-400 text-2xl font-bold">{playerStats.vampirez.most_vampire_kills_new}</p>
              </div>
            </div>
            <div className="mt-6 w-full flex flex-col gap-3">
              <div className="bg-[#212121] rounded-xl p-4 border border-white/10">
                <p className="text-white/50 text-sm">Coins</p>
                <p className="text-yellow-400 text-2xl font-bold">{getValue(playerStats.vampirez.coins)}</p>
              </div>
              <div className="bg-[#212121] rounded-xl p-4 border border-white/10">
                <p className="text-white/50 text-sm">Gold Bought</p>
                <p className="text-yellow-500 text-2xl font-bold">{getValue(playerStats.vampirez.gold_bought)}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col h-[85%] mt-10 w-full">
            <div className="flex gap-2 flex-wrap">
              {["Human", "Vampire", "Armor", "Quests", "Achievements"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedType(tab)}
                  className={`px-6 py-3 rounded-t-xl border flex-1 min-w-[100px] cursor-pointer ${
                    selectedType === tab
                      ? tab === "Human"
                        ? "bg-cyan-400 text-black"
                        : tab === "Vampire"
                        ? "bg-red-500 text-black"
                        : tab === "Armor"
                        ? "bg-yellow-400 text-black"
                        : tab === "Quests"
                        ? "bg-purple-500 text-black"
                        : "bg-amber-400 text-black"
                      : "bg-[#212121]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 bg-[#212121] p-6 rounded-b-xl overflow-y-auto custom-scroll">
              {selectedType === "Human" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card label="Vampire Kills" value={getValue(playerStats.vampirez.vampire_kills)} color="cyan" />
                  <Card label="Zombie Kills" value={getValue(playerStats.vampirez.zombie_kills)} color="cyan" />
                  <Card label="Human Deaths" value={getValue(playerStats.vampirez.human_deaths)} color="cyan" />
                  <Card label="Human Wins" value={getValue(playerStats.vampirez.human_wins)} color="cyan" />
                  <Card label="KDR" value={getValue(playerStats.vampirez.humanKdr)} color="cyan"/>
                  <SectionTitle title="Survivor Perks" />
                  {["gold_starter", "gold_booster", "zombie_doubler", "baby_hater", "explosive_killer", "fireproofing", "transfusion", "van_helsing", "constitution", "foresight", "loot_drops", "basic_swag", "advanced_swag", "expert_swag"].map((key) => (
                    <Card
                      key={key}
                      label={key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      value={getValue(playerStats.vampirez[key])}
                      color="cyan"
                    />
                  ))}
                </div>
              )}

              {selectedType === "Vampire" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card label="Human Kills" value={getValue(playerStats.vampirez.human_kills)} color="red" />
                  <Card label="Vampire Deaths" value={getValue(playerStats.vampirez.vampire_deaths)} color="red" />
                  <Card label="Vampire Wins" value={getValue(playerStats.vampirez.vampire_wins)} color="red" />
                  <Card label="KDR" value={getValue(playerStats.vampirez.vampireKdr)} color="red"/>
                  <SectionTitle title="Vampire Perks" />
                  {["vampiric_minion", "blood_booster", "drain_punch", "wave_booster", "kill_booster", "blood_drinker", "final_breath", "hellborn", "vampiric_scream", "renfield", "terror_level", "frankensteins_monster"].map((key) => (
                    <Card
                      key={key}
                      label={key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      value={getValue(playerStats.vampirez[key])}
                      color="red"
                    />
                  ))}
                </div>
              )}

              {selectedType === "Armor" && (
                <div>
                <SectionTitle title="Bought Armor" />
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {playerStats.vampirez.dyes.map((dye) => (
                    <Card key={Math.random()} dye={dye}/>
                  ))}
                </div>
                </div>
              )}

              {selectedType === "Quests" && (
                <div>
                  <div className="mb-8">
                    <SectionTitle title={"Daily Quests"}/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {playerStats.vampirez.quests.daily.map((q, i) => <QuestCard key={i} quest={q} />)}
                    </div>
                  </div>
                  <div className="mb-8">
                    <SectionTitle title={"Weekly Quests"}/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {playerStats.vampirez.quests.weekly.map((q, i) => <QuestCard key={i} quest={q} />)}
                    </div>
                  </div>
                </div>
              )}

              {selectedType === "Achievements" && (
                <div className="space-y-12">
                  <div>
                    <SectionTitle title="One-Time Achievements" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {playerStats.vampirez.achievements.onetime.map((ach, i) => (
                        <OneTimeAchievement key={i} achievement={ach} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <SectionTitle title="Tiered Achievements" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {playerStats.vampirez.achievements.tiered.map((ach, i) => (
                        <TieredAchievement key={i} achievement={ach} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;