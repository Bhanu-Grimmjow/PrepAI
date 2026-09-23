const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { tokenBlacklistModel } = require("../models/blacklist.model");


 /**
 * @name registerUserController
 * @description register a new user 
 *@acsess  Public
 * 
 */
async function registerUserController(req,res) { 

    try {

        const {username, email, password} = req.body 
 
        if (!username|| !email || !password) { 
            return res.status(400).json({ 
                success: false, 
                message: "please fill all fields" 
            })
        } 
 
        const isUserAlreadyExists= await userModel.findOne({ 
            $or:[ 
                {email},            //if any 1 option is find in this ($or: use for this ) 
                {username}
            ] 
        }) 
     
        if(isUserAlreadyExists) { 
            return res.status(400).json({ 
                message:"user already exists" 
            }) 
        } 
        
        const hash = await bcrypt.hash(password,10) 

        const user = await userModel.create({ 
            username, 
            email, 
            password: hash 
        }) 

        const token = jwt.sign(
            {id:user._id,username:user.username}, 
            process.env.JWT_SECRET,
            { 
                expiresIn:"30d" 
            }
        ) 
 
        res.cookie("token",token)

        res.status(201).json({ 
            message:"user registered successfully", 
            user:{ 
                id:user._id, 
                username:user.username, 
                email:user.email 
            }
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Internal server error"
        })

    }
}

    /**
     * @name loginUserController
     * @description login a user
     *@acsess  Public
     * 
    
      */
       async function loginUserController(req,res){
    try {

        const {email, password} = req.body

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message:"invalid credentials"
            })
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(!isPasswordValid) {
            return res.status(400).json({
                message:"invalid credentials"
            })
        }

        const token = jwt.sign(
            {id:user._id,username:user.username},
            process.env.JWT_SECRET,{
                expiresIn:"30d"
            }
        )

        res.cookie("token",token)

        res.status(200).json({
            message:"user logged in successfully",
            user:{
                username:user.username,
                email:user.email
            }
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message:"Internal server error"
        })
    }
}
            

       /**
     * @name logoutUserController
     * @description logout a user
     *@acsess  public
     * 
       */
       async function logoutUserController(req,res){
    try {

        const token = req.cookies.token

        if(token){
            await tokenBlacklistModel.create({token})
        }

        res.clearCookie("token")

        res.status(200).json({
            message:"user logged out successfully"
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message:"Internal server error"
        })
    }
}

         
         /**
         * @name getMeController
         * @description fetch logged in user user detail
         *@access  Private
          */

       async function getMeController(req,res){
    try {

        const user = await userModel.findById(req.user.id)

        res.status(200).json({
            message:"user fetched successfully",
            user:{
                id:user._id,
                username: user.username,
                email:user.email
            }
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message:"Internal server error"
        })
    }
}


module.exports = {registerUserController , loginUserController,logoutUserController,getMeController}