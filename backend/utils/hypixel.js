import { createCanvas, loadImage } from "canvas"

export function isDailyQuestCompletedToday(quest) {
    if (!quest) return false
    if (quest.active) return false

    const lastCompletionTime = quest.completions?.at(-1)?.time
    if (!lastCompletionTime) return false

    const nyDateFormatter = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" })
    const todayNY = nyDateFormatter.format(new Date())
    const completionDateNY = nyDateFormatter.format(new Date(lastCompletionTime))

    return todayNY === completionDateNY
}

export function isWeeklyQuestCompletedThisWeek(quest) {
    if (!quest) return false
    if (quest.active) return false

    const lastCompletionTime = quest.completions?.at(-1)?.time
    if (!lastCompletionTime) return false

    const nyFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        weekday: "short",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    })

    function getNYParts(date) {
        const parts = nyFormatter.formatToParts(date)
        const obj = {}
        for (const part of parts) obj[part.type] = part.value
        return obj
    }

    function getLastFridayMidnightNY(date) {
        const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
        const parts = getNYParts(date)
        const currentWeekday = dayMap[parts.weekday]
        let daysSinceFriday = currentWeekday - 5
        if (daysSinceFriday < 0) daysSinceFriday += 7

        const cursor = new Date(date.getTime() - daysSinceFriday * 24 * 60 * 60 * 1000)
        const cursorParts = getNYParts(cursor)

        const midnightString = `${cursorParts.year}-${cursorParts.month}-${cursorParts.day}T00:00:00`
        const utcGuess = new Date(midnightString + "Z")
        const offsetCheck = getNYParts(utcGuess)
        const hourOffset = Number(offsetCheck.hour)
        return new Date(utcGuess.getTime() - hourOffset * 60 * 60 * 1000)
    }

    const now = new Date()
    const lastFridayMidnightForNow = getLastFridayMidnightNY(now)
    const lastFridayMidnightForCompletion = getLastFridayMidnightNY(new Date(lastCompletionTime))

    return lastFridayMidnightForNow.getTime() === lastFridayMidnightForCompletion.getTime()
        && lastCompletionTime >= lastFridayMidnightForNow.getTime()
}

// i DONT NOT KNOW how ts works, got all of it from plancke's github (i am not going to learn math only for a pixel game stats) 
export function getNetworkLevel(exp) {
    const BASE = 10000;
    const GROWTH = 2500;

    const REVERSE_PQ_PREFIX = -(BASE - 0.5 * GROWTH) / GROWTH;
    const REVERSE_CONST = REVERSE_PQ_PREFIX * REVERSE_PQ_PREFIX;
    const GROWTH_DIVIDES_2 = 2 / GROWTH;

    return exp < 0 ? 1 : Math.floor(1 + REVERSE_PQ_PREFIX + Math.sqrt(REVERSE_CONST + GROWTH_DIVIDES_2 * exp));
}

const TEXTURE_URL = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.20.2/assets/minecraft/textures/item/leather_chestplate.png";

export async function makeColoredChestplate(hexColor) {
  const img = await loadImage(TEXTURE_URL);

  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(img, 0, 0);

  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = hexColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "destination-in";
  ctx.drawImage(img, 0, 0);

  return canvas.toBuffer("image/png");
}