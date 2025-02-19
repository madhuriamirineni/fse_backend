
const User = require('../Models/User')
const Admin=require('../Models/Admin')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')



const getUsers = async (req, res) => {
    const usersList = await User.find()
    res.status(200).send({ message: "users", payload: usersList })
}

const createUser = async (req, res) => {
   
        const salt=await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(req.body.password, salt)
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body)
        res.status(201).send({ message: "User created", payload: newUser })
    
}

const loginUser = async (req, res) => {
    const {loginId,password} = req.body;
    const user = await User.findOne({ loginId });
    if (!user) {
        return res.status(401).send({ message: "Invalid LoginId or Password" })
    }
    const result = await bcryptjs.compare(password, user.password)
    if (!result) {
         return res.status(401).send({ message: "Invalid Login ID or Password" })
    }
        const signedToken = jwt.sign({ userId:user._id,role:user.role }, process.env.SECRET_KEY, { expiresIn:'1d' })
        res.status(200).send({ message: "login success", token: signedToken, user: user})
          
    }
    


const resetPassword=async(req,res)=>{
    const {loginId}=req.params;
    const {newPassword,confirmNewPassword}=req.body;
    if(newPassword!==confirmNewPassword){
       return res.status(400).send({message:"Password don't match"})
    }
    const user=await User.findOne({loginId:loginId});
    const salt=await bcryptjs.genSalt(10);
    user.password=await bcryptjs.hash(newPassword,salt);
    await user.save();
    res.status(200).send({message:"Password reset successful"})
}



module.exports = { getUsers, createUser,loginUser,resetPassword }