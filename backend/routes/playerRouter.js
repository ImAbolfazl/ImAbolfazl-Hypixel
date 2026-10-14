import express from "express"
import { getStats } from "../services/hypixel.js"
import { getUUID } from "../services/mojang.js"
import { armorColorMap, getDailyQuestsVZ, getRankMap, getWeeklyQuestsVZ, plusColorMap, vzAchievementsOneTimeMap, vzAchievementsTieredMap } from "../utils/datas.js"
import { getNetworkLevel, makeColoredChestplate } from "../utils/hypixel.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/stats/:username", authMiddleware,async (req, res) => {
    const uuid = await getUUID(req.params.username)
    if(!uuid){return res.sendStatus(404)}
    const fetchedStats = await getStats(uuid)
    const stats = fetchedStats.player
    if(!stats){return res.sendStatus(404)}
    let responseData = {}

        responseData = {
            uuid: stats.uuid,
            username: stats.displayname,
            networkLevel: getNetworkLevel(stats.networkExp),
            achievementPoints: Number(stats.achievementPoints).toLocaleString("en-US"),
            karma: Number(stats.karma).toLocaleString("en-US")
        }

        const rankMap = getRankMap(stats)
        responseData = {...responseData, rank: rankMap[stats.newPackageRank]}

        if(stats.newPackageRank == "MVP_PLUS"){
            if(stats.monthlyPackageRank == "NONE"){
                responseData = {...responseData, rank: rankMap[stats.newPackageRank]}
            }else if(stats.monthlyPackageRank == "SUPERSTAR"){
                responseData = {...responseData, rank: rankMap["MVP_PLUS_PLUS"]}
            }
        }

        if(responseData.rank != null){
            responseData.rank = {...responseData.rank, plusColor: plusColorMap[stats.rankPlusColor]}
        }

        responseData = {...responseData, vampirez: {
            humanKdr: (stats.stats.VampireZ.vampire_kills / stats.stats.VampireZ.human_deaths).toFixed(2),
            vampireKdr: (stats.stats.VampireZ.human_kills / stats.stats.VampireZ.vampire_deaths).toFixed(2)
        }}

        responseData.vampirez = {
            ...responseData.vampirez,
            ...Object.fromEntries(
                Object.entries(stats.stats.VampireZ)
                    .filter(([key]) => !key.startsWith("bought_dye_color:"))
                    .map(([key, value]) => [
                        key,
                        typeof value === "number" ? value.toLocaleString("en-US") : value
                    ])
            )
        }

        responseData.vampirez.dyes = [
            ...(responseData.vampirez.dyes || []),
            ...Object.entries(stats.stats.VampireZ)
                .filter(([key]) => key.startsWith("bought_dye_color:"))
                .map(([key]) => {
                    const match = armorColorMap.find((armor) => armor.name === key);
                    return match ? match.color : null;
                })
                .filter(Boolean)
        ];

        const playerOneTimeDoneAchivements = stats.achievementsOneTime || []
        const playerTieredDoneAchivements = stats.achievements || []

        responseData.vampirez = {
            ...responseData.vampirez,
            quests: {
                daily: getDailyQuestsVZ(stats),
                weekly: getWeeklyQuestsVZ(stats)
            },
            achievements: {
                onetime: vzAchievementsOneTimeMap.map((achievement) => ({
                    ...achievement,
                    isDone: playerOneTimeDoneAchivements.includes(`vampirez_${achievement.id.toLowerCase()}`)
                })),
                tiered: vzAchievementsTieredMap.map((achievement) => ({
                    ...achievement,
                    done: playerTieredDoneAchivements[`vampirez_${achievement.id.toLowerCase()}`]
                }))
            }
        }

    res.status(200).json(responseData)
})

router.get("/chestplate", async (req, res) => {
    const color = req.query.color
    
    res.send(await makeColoredChestplate(color))
})

export {router as playerRouter}