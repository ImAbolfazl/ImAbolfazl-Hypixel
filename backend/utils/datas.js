import { isDailyQuestCompletedToday, isWeeklyQuestCompletedThisWeek } from "./hypixel.js"

        export function getRankMap(stats) {
            const rankMap = {
                "NONE": null,
                "VIP": {rank: "VIP", plus: null, displayColor: "#55FF55"},
                "VIP_PLUS": {rank: "VIP", plus: "+", displayColor: "#55FF55"},
                "MVP": {rank: "MVP", plus: null, displayColor: "#55FFFF"},
                "MVP_PLUS": {rank: "MVP", plus: "+", displayColor: "#55FFFF"},
                "MVP_PLUS_PLUS": {rank: "MVP", plus: "++", displayColor: stats.monthlyRankColor == "GOLD" ? "#FFAA00" : "#55FFFF"},
            }
            return rankMap
        }

        export const plusColorMap = {
            "RED": "#FF5555",
            "GOLD": "#FFAA00",
            "GREEN": "#55FF55",
            "YELLOW": "#FFFF55",
            "LIGHT_PURPLE": "#FF55FF",
            "WHITE": "#FFFFFF",
            "BLUE": "#5555FF",
            "DARK_GREEN": "#00AA00",
            "DARK_RED": "#AA0000",
            "DARK_AQUA": "#00AAAA",
            "DARK_PURPLE": "#AA00AA",
            "DARK_GREY": "#555555",
            "BLACK": "#000000",
            "DARK_BLUE": "#0000AA",
        }

        export const vzAchievementsOneTimeMap = [
            {name: "Cash4Blood", description: "Purchase Blood from the shop", points: 5, id: "PURCHASE_BLOOD"},
            {name: "Rampage!", description: "Kill 3 Vampires in 10 seconds as a Survivor", points: 5, id: "NIGHTMARE"},
            {name: "Blood Thirsty", description: "Kill 10 Survivors in a row without dying", points: 15, id: "BLOOD_THIRSTY"},
            {name: "Coins4Gold", description: "Purchase Gold from the shop", points: 5, id: "PURCHASE_GOLD"},
            {name: "Pest!", description: "Kill a Vampire while they are in Bat Form", points: 5, id: "PEST"},
            {name: "Bloodthirsty", description: "Have 150 Blood at once", points: 5, id: "BLOOD"},
            {name: "Not the Survival Games", description: "Purchase food from the Gold Shop", points: 5, id: "PURCHASE_FOOD"},
            {name: "Last Man Standing", description: "Be the last remaining Survivor", points: 10, id: "SOLE_SURVIVOR"},
            {name: "Robbed!", description: "Max out the Loot Drops Survivor perk", points: 15, id: "ROBBED"},
            {name: "The Original", description: "Kill a Survivor with The Original Fang", points: 5, id: "VAMPIRE_FANG_KILL"},
            {name: "Vampire Slayer", description: "Kill 15 Vampires in one game", points: 10, id: "VAMPIRE_KILLS_ONE_ROUND"},
            {name: "Fits Like a Glove", description: "Purchase armor from the Gold Shop", points: 5, id: "PURCHASE_ARMOR"},
            {name: "Don't need it!", description: "Win a game as a Human without using the shop", points: 15, id: "DONT_NEED_IT"},
            {name: "Dangerous to Go Alone", description: "Purchase a sword from the Gold Shop", points: 5, id: "PURCHASE_SWORD"},
            {name: "Vampiric Mutant", description: "Purchase something from the Blood Shop", points: 5, id: "VAMPIRE_SHOP"},
            {name: "POTIONS!", description: "Drink 20 Potions as a Human in a single game", points: 5, id: "POTIONS"},
            {name: "Zombie Killer", description: "Kill 35 Zombies in one game", points: 10, id: "KILL_ZOMBIES"},
            {name: "Upgraded", description: "Unlock 10 upgrades from the shop", points: 10, id: "UPGRADED"},
            {name: "Undefeatable!", description: "Purchase a full set of Divine Armor and an Excalibur as a Human", points: 10, id: "UNDEFEATABLE"},
            {name: "Impaled", description: "Kill a Vampire with a Wooden Stake as a Survivor", points: 10, id: "WORD_PUNS"},
            {name: "Purified!", description: "Kill a Vampire with Holy Water", points: 5, id: "PURIFIED"},
            {name: "Chest Hunter", description: "Find 3 loot chests", points: 10, id: "CHEST_HUNTER"},
            {name: "Gold Digger", description: "Have 1000 Gold at once", points: 10, id: "GOLD"},
            {name: "Last Chance", description: "Win the game as the last remaining Human", points: 15, id: "LAST_CHANCE"},
            {name: "Black Friday", description: "Kill a Survivor in the first round", points: 5, id: "FIRST_WAVE_KILL"},
            {name: "This tastes funny", description: "Eat the Enchanted Steak", points: 5, id: "TASTES_FUNNY"},
            {name: "Zombie Slayer", description: "Kill 100 Zombies in a single game", points: 10, id: "ZOMBIE_SLAYER"},
            {name: "Bloody Bulldozer", description: "Kill 10 Survivors in one game", points: 10, id: "SURVIVOR_KILLS_ONE_ROUND"},
            {name: "Zombie Whisperer", description: "Kill a survivor with a Baby Zombie", points: 5, id: "ZOMBIE_WHISPERER"}
        ]

        export const vzAchievementsTieredMap = [
            {
                name: "Zombie Hunter",
                description: "Kill %%value%% Zombies",
                id: "ZOMBIE_KILLER",
                tiers: [1, 2, 3, 4, 5],
                amounts: [250, 500, 2500, 7500, 10000]
            },
            {
                name: "VampireZ Banker",
                description: "Earn %%value%% coins in VampireZ",
                id: "COINS",
                tiers: [1, 2, 3, 4, 5],
                amounts: [10000, 20000, 55000, 75000, 150000]
            },
            {
                name: "Vampire Hunter",
                description: "Kill %%value%% Vampires",
                id: "KILL_VAMPIRES",
                tiers: [1, 2, 3, 4, 5],
                amounts: [10, 100, 500, 1000, 2500]
            },
            {
                name: "Blood Sucker",
                description: "Kill %%value%% Survivors",
                id: "KILL_SURVIVORS",
                tiers: [1, 2, 3, 4, 5],
                amounts: [10, 100, 500, 1000, 1500]
            },
            {
                name: "Survivor",
                description: "Win %%value%% games as a Survivor",
                id: "SURVIVOR_WINS",
                tiers: [1, 2, 3, 4, 5],
                amounts: [1, 10, 50, 100, 150]
            }
        ]

        export function getDailyQuestsVZ(stats){
            const dailyQuestsVZ = [
                            {
                                name: "VampireZ",
                                isCompleted: isDailyQuestCompletedToday(stats.quests.vampirez_daily_win),
                                description: [
                                {description: "Play a game of VampireZ", completed: stats.quests.vampirez_daily_win.active ? stats.quests.vampirez_daily_win.active.objectives.vampirez_daily_play : 0, amount: 1},
                                ]
                            },
                            {
                                name: "Blood Drinker",
                                isCompleted: isDailyQuestCompletedToday(stats.quests.vampirez_daily_kill),
                                description: [
                                {description: "Kill 10 vampires in VampireZ", completed: stats.quests.vampirez_daily_kill.active ? stats.quests.vampirez_daily_kill.active.objectives.vampirez_daily_kill_vampire : 0, amount: 10},
                                {description: "Kill 20 zombies in VampireZ", completed: stats.quests.vampirez_daily_kill.active ? stats.quests.vampirez_daily_kill.active.objectives.vampirez_daily_kill_zombie : 0, amount: 20}
                                ]
                            },
                            {
                                name: "Human Killer",
                                isCompleted: isDailyQuestCompletedToday(stats.quests.vampirez_daily_human_kill),
                                description: [
                                {description: "Kill 10 Survivors in VampireZ", completed: stats.quests.vampirez_daily_human_kill.active ? stats.quests.vampirez_daily_human_kill.active.objectives.vampirez_daily_kill_human : 0, amount: 10}
                                ]
                            },
                            {
                                name: "VampireZ Daily Win",
                                isCompleted: isDailyQuestCompletedToday(stats.quests.vampirez_daily_win),
                                description: [
                                {description: "As a Survivor Win a game of VampireZ", completed: stats.quests.vampirez_daily_win.active ? stats.quests.vampirez_daily_win.active.objectives.vampirez_daily_win : 0, amount: 1}
                                ]
                            }
                        ]

                        return dailyQuestsVZ
        }

        export function getWeeklyQuestsVZ(stats){
            const weeklyQuestsVZ = [
                    {
                        name: "VampireZ Daily Win",
                        isCompleted: isWeeklyQuestCompletedThisWeek(stats.quests.vampirez_weekly_win),
                        description: [
                        {description: "Win 12 games as a Human", completed: stats.quests.vampirez_weekly_win.active ? stats.quests.vampirez_weekly_win.active.objectives.vampirez_weekly_win_survivor : 0, amount: 12}
                        ]
                    },
                    {
                        name: "Vampire Slayer",
                        isCompleted: isWeeklyQuestCompletedThisWeek(stats.quests.vampirez_weekly_kill),
                        description: [
                        {description: "Kill 130 Zombies", completed: stats.quests.vampirez_weekly_kill.active ? stats.quests.vampirez_weekly_kill.active.objectives.vampirez_weekly_kill_zombie : 0, amount: 130},
                        {description: "Kill 25 Vampires", completed: stats.quests.vampirez_weekly_kill.active ? stats.quests.vampirez_weekly_kill.active.objectives.vampirez_weekly_kill_vampire : 0, amount: 25}
                        ]
                    },
                    {
                        name: "Human Slayer",
                        isCompleted: isWeeklyQuestCompletedThisWeek(stats.quests.vampirez_weekly_human_kill),
                        description: [
                        {description: "Kill 100 Survivors", completed: stats.quests.vampirez_weekly_human_kill.active ? stats.quests.vampirez_weekly_human_kill.active.objectives.vampirez_weekly_kill_survivor : 0, amount: 100},
                        ]
                    }
                ]

                return weeklyQuestsVZ
        }

    export const armorColorMap = [
        { name: "bought_dye_color:[rgb0x8000]", color: "#008000" },
        { name: "bought_dye_color:[rgb0xff00]", color: "#00ff00" },
        { name: "bought_dye_color:[rgb0xffa50]", color: "#0ffa50" },
        { name: "bought_dye_color:[rgb0xffff0]", color: "#0ffff0" },
        { name: "bought_dye_color:[rgb0xc0c0c0]", color: "#c0c0c0" },
        { name: "bought_dye_color:[rgb0x08080]", color: "#008080" },
        { name: "bought_dye_color:[rgb0x80080]", color: "#080080" },
        { name: "bought_dye_color:[rgb0xffffff]", color: "#ffffff" },
        { name: "bought_dye_color:[rgb0x0ffff]", color: "#00ffff" },
        { name: "bought_dye_color:[rgb0x808080]", color: "#808080" },
        { name: "bought_dye_color:[rgb0xff0ff]", color: "#0ff0ff" },
        { name: "bought_dye_color:[rgb0x0800]", color: "#000800" },
        { name: "bought_dye_color:[rgb0x000]", color: "#000000" },
        { name: "bought_dye_color:[rgb0x0ff0]", color: "#000ff0" },
        { name: "bought_dye_color:[rgb0x0080]", color: "#000080" },
        { name: "bought_dye_color:[rgb0x80800]", color: "#080800" },
        { name: "bought_dye_color:[rgb0x00ff]", color: "#0000ff" },
        { name: "bought_dye_color:[argb0xffb34400]", color: "#b34400" },
        { name: "bought_dye_color:[argb0xffffff00]", color: "#ffff00" },
        { name: "bought_dye_color:[argb0xff808000]", color: "#808000" },
        { name: "bought_dye_color:[argb0xff008000]", color: "#008000" },
        { name: "bought_dye_color:[argb0xffffa500]", color: "#ffa500" },
        { name: "bought_dye_color:[argb0xffff00ff]", color: "#ff00ff" },
        { name: "bought_dye_color:[argb0xff808080]", color: "#808080" },
        { name: "bought_dye_color:[argb0xff800080]", color: "#800080" },
        { name: "bought_dye_color:[argb0xff000000]", color: "#000000" },
        { name: "bought_dye_color:[argb0xffff0000]", color: "#ff0000" },
        { name: "bought_dye_color:[argb0xff00ffff]", color: "#00ffff" },
        { name: "bought_dye_color:[argb0xffc0c0c0]", color: "#c0c0c0" },
        { name: "bought_dye_color:[argb0xff00ff00]", color: "#00ff00" },
        { name: "bought_dye_color:[argb0xff008080]", color: "#008080" },
        { name: "bought_dye_color:[argb0xff800000]", color: "#800000" },
        { name: "bought_dye_color:[argb0xffffffff]", color: "#ffffff" }
        ]