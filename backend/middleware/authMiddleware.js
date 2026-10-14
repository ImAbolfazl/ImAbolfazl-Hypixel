export function authMiddleware(req, res, next){
    const authorization = req.headers.authorization

    if(authorization != process.env.AUTH_SECRET){return res.status(401).json("please provide a valid token")}
    if(authorization == process.env.AUTH_SECRET){next()}
}