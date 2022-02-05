const User = require("../models/user")

exports.signup = async (req,res) => {
    const user = new User(req.body)
    try{
        const saveuser = await user.save();
        res.status(200).json(saveuser);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err)
    }
}



/* exports.signin = (req,res) => {
    const {email , password} = req.body;
    User.find({email} , (err , user) => {
        if(err || !user ){
            res.status(400).json(err)
        }
        
    })
} */
