import { Routes, Route, Router } from "react-router"
import Home from "./pages/Home"
import Leaderboards from "./pages/Leaderboards"
import VampireZ from "./pages/VampireZ"
import Tracker from "./pages/Tracker"
import BedWars from "./pages/BedWars"
import General from "./pages/General"
import Quests from "./pages/Quests"

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/leaderboards" element={<Leaderboards/>}></Route>
        <Route path="/tracker" element={<Tracker/>}></Route>
        <Route path="/vampirez" element={<VampireZ/>}></Route>
        <Route path="/bedwars" element={<BedWars/>}></Route>
        <Route path="/general" element={<General/>}></Route>
        <Route path="/quests" element={<Quests/>}></Route>
      </Routes>
  )
}

export default App
