const mongoose =require("mongoose")

const blacklistTokenSchema = new mongoose.Schema({
    token:{ type:String, required:true },
    createdAt:{ type:Date, default:Date.now, expires:"30d" }
},{

        timestamps:true
    })

    const tokenBlacklistModel = mongoose.model("BlacklistToken",blacklistTokenSchema)
    module.exports = {tokenBlacklistModel}