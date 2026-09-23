const mongoose =require("mongoose")

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required to bee add in black list "]
    }},{

        timestamps:true
    })

    const tokenBlacklistModel = mongoose.model("BlacklistToken",blacklistTokenSchema)
    module.exports = {tokenBlacklistModel}