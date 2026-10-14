export const uuidCache = new Map()
export const statsCache = new Map()

setInterval(() => {
    uuidCache.clear()
}, 24 * 60 * 60 * 1000 )

setInterval(() => {
    statsCache.clear()
}, 10 * 60 * 1000)