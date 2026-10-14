import axios from "axios"
import { statsCache } from "../caches/caches.js"

export async function getStats(uuid) {
    if(statsCache.has(uuid)){
        return statsCache.get(uuid)
    }else{
        try{
            const response = await axios.get(`https://api.hypixel.net/v2/player?uuid=${uuid}`, {headers: {"API-Key": process.env.HYPIXEL_API_KEY}})
            if(response.data){
                statsCache.set(uuid, response.data)
                return response.data
            }
        }catch(err){console.log(err)}
    }
}

export async function getLeaderboards(apiKey) {
        try{
            const response = await axios.get(`https://api.hypixel.net/v2/leaderboards`, {headers: {"API-Key": process.env.HYPIXEL_API_KEY}})
            if(response.data){
                return response.data
            }
        }catch(err){console.log(err)}
}