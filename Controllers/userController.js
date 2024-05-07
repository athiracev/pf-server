const users = require("../Models/userModel")
const jwt= require("jsonwebtoken")


exports.userRegister = async (req, res) => {
    const { username, password, email } = req.body
    console.log(req.body);
    try {
        const existingUser = await  users.findOne({ email })
        if (existingUser) {
           
            res.status(401).json("User Already Exist")
        } else {

            const newUser = new users({
                username, password, email, profile: "", github: "", linkedin: ""
            })
            await newUser.save()
            res.status(201).json(newUser)
        }

    } catch (error) {
        res.status(404).json(error)

    }
}



exports.userLogin =async(req,res)=>{
    const {email,password}=req.body
    try {
        const existingUser = await users.findOne({email,password})
        console.log(existingUser)
        if(existingUser){
            const token=jwt.sign({email:existingUser.email,username:existingUser.username,userId:existingUser._id},process.env.secret_key)
            const rest= {token,username:existingUser.username}
            console.log(rest)
            console.log(existingUser)
            res.status(201).json(rest)
        }
        else{
            res.status(406).json("Invalid username or password")
        }
    } catch (error) {
        console.log(error)
        res.status(401).json(err)
        
    }



}

