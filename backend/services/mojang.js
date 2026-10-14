import axios from "axios"
import { uuidCache } from "../caches/caches.js"

export async function getUUID(username) {
    if(uuidCache.has(username)){
        return uuidCache.get(username)
    }else{
        try{
            const response = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`)
            if(response.data){
                uuidCache.set(username, response.data.id)
                return response.data.id
            }
        }catch(err){console.log(err)}
    }
}