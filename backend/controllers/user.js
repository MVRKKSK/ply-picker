const User = require("../models/user")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")

exports.signup = async (req, res) => {
    const user = new User(req.body)
    try {
        const saveuser = await user.save();
        res.status(200).json(saveuser);
    }
    catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
}



exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in user model
        if (!user.authentication(password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        }


        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
        res.cookie("t", token, { expiry: new Date() + 9999 })

        const { _id, name, mobile_no, email} = user;
        return res.json({ token, user: { _id, name, mobile_no, email, password } })


    })
}
