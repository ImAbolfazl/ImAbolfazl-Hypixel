import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import notifAudio from "../assets/notification-sound.ogg"
import axios from 'axios'

const Tracker = () => {
  const [playerCount, setPlayerCount] = useState(null)
  const [selectedGame, setSelectedGame] = useState("")
  const [selectedMode, setSelectedMode] = useState("")
  const [selectedLimit, setSelectedLimit] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const audioRef = useRef(null)
  const cooldownRef = useRef(0)

  useEffect(() => {
    fetchPlayerCount()
  }, [])

      const fetchPlayerCount = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_COUNT_BACKEND_URL, {headers: {password: import.meta.env.VITE_COUNT_BACKEND_PASSWORD}})

        if(response.data){
          const data = response.data
          setPlayerCount(data)
          setLoading(false)
        }
      } catch (err) {
        setError("there is something wrong with the API please try again later")
      }
    }
  
  const interval = setInterval(() => {
    fetchPlayerCount()
  }, 5000)

  useEffect(() => {
    if (!selectedGame || !selectedLimit) return

    const interval = setInterval(() => {
      const currentPlayers =
        playerCount?.games?.[selectedGame]?.players

      if (!currentPlayers) return

      cooldownRef.current++

      if (
        playerCount.games[selectedGame]?.modes[selectedMode] >= selectedLimit &&
        cooldownRef.current >= 120
      ) {
        audioRef.current?.play()
        cooldownRef.current = 0
      }

    }, 1000)

    return () => clearInterval(interval)
  }, [selectedGame, selectedLimit, playerCount])

  const modes =
    selectedGame &&
    playerCount?.games?.[selectedGame]?.modes
      ? playerCount.games[selectedGame].modes
      : null

  if(loading) return (
    <div className='flex justify-center items-center text-white text-3xl h-screen'>
      <Header/>
      {error ? (<p>{error}</p>) : <p>Loading...</p>}
    </div>
  )

  return (
    <>
      <Header />

      <audio ref={audioRef} src={notifAudio} />

      <div className="h-[100vh] flex flex-col items-center justify-center text-white gap-6">

        <div className="flex flex-col gap-2">
          <label className="text-lg">Select Game:</label>

          <select
            className="bg-[#212121] p-3 rounded-lg min-w-[250px]"
            value={selectedGame}
            onChange={(e) => {
              setSelectedGame(e.target.value)
              setSelectedMode("")
            }}
          >
            <option value="">-- choose game --</option>

            {!loading && !error && playerCount?.games &&
              Object.entries(playerCount.games)
                .sort((a, b) => b[1].players - a[1].players)
                .map(([game, data]) => (
                  <option key={game} value={game}>
                    {game} ({data.players})
                  </option>
                ))
            }
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg">Select Mode:</label>

          <select
            className="bg-[#212121] p-3 rounded-lg min-w-[250px]"
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            disabled={!modes}
          >
            <option value="">
              {modes ? "-- choose mode --" : "Select a game first"}
            </option>

            {modes &&
              Object.entries(modes)
                .sort((a, b) => b[1] - a[1])
                .map(([mode, count]) => (
                  <option key={mode} value={mode}>
                    {mode} ({count})
                  </option>
                ))
            }
          </select>
        </div>

        {selectedGame && (
          <div className="bg-[#1a1a1a] px-6 py-4 rounded-lg text-center">
            <h2 className="text-xl font-semibold">{selectedGame}</h2>

            {selectedMode ? (
              <p>
                {selectedMode}: {modes[selectedMode]} players
              </p>
            ) : (
              <p>
                Total: {playerCount?.games?.[selectedGame]?.players} players
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2 bg-[#1f1f1f] p-4 rounded-xl w-72 text-white border border-gray-700">
          <p className="text-sm text-gray-300">
            Notify me when player count reaches:
          </p>

          <input
            type="number"
            placeholder="Enter a limit"
            className="bg-[#121212] text-white px-3 py-2 rounded-lg border border-gray-600
                       focus:outline-none focus:ring-2 focus:ring-cyan-400"
            onChange={(e) => setSelectedLimit(Number(e.target.value))}
          />
        </div>

      </div>
    </>
  )
}

export default Tracker