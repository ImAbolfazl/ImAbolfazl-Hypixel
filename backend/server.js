import "./config/env.js" 
import express from "express"
import axios from "axios"
import cors from "cors"
import { playerRouter } from "./routes/playerRouter.js"

const app = express()
app.use(express.json())
app.use(cors({origin: "http://localhost:5173"}));
const PORT = process.env.PORT || 8080

app.use("/api/player" ,playerRouter)

app.listen(PORT, () => console.log(`server running on port ${PORT}`))