import {ApiErro,AsyncHandler} from "../utils/index.utils.js"
import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const verifyJwt = AsyncHandler(async(req,res,next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
        if (!token) {
            throw new ApiErro(401,"unauthorized access")
        }
        
        const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodeToken._id).select("-password -refreshToken")

        if(!user){
            throw new ApiErro(401,"invalid access token")
        }

        req.user = user
        next()
    } catch (error) {
        throw new ApiErro(401,error.message)
    }
})