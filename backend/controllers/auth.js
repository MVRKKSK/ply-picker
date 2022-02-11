const User = require("../models/user")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")
/* const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client("906236579266-e1isgkemkp73tp9auo6jioj065gghqq9.apps.googleusercontent.com"); */

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
        if (!user.authentication(password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        }


        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
        res.cookie("t", token, { expiry: new Date() + 9999 })

        const { _id, name, email } = user;
        return res.json({ token, user: { _id, name, email } })


    })
}


exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({ message: "user is signed out " })
}


/* exports.googlelogin = (req, res) => {
    const { tokenId } = req.body;

    client.verifyIdToken({ idToken: tokenId, audience: "906236579266-e1isgkemkp73tp9auo6jioj065gghqq9.apps.googleusercontent.com" }).then(response => {
        const { email_verified, email, name } = response.payload;
        console.log(response.payload)

        if(email_verified){
            User.findOne({email} , (err , user) => {
                if(err){
                    res.status(400).json({
                        error: 'kuch toh gadbad hai'
                    });
                }
                else{
                    if(user){
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
                        res.cookie("t", token, { expiry: new Date() + 9999 })
                
                        const { _id, name, mobile_no, email } = user;
                        return res.json({ token, user: { _id, name, mobile_no, email } })
                    }
                    else{
                        let password = email+process.env.JWT_SECRET;
                        let newUser = new User({email , password , name});
                        newUser.save((err , data) => {
                            if(err){
                                res.status(400).json({
                                    error: 'kuch toh gadbad hai'
                                });
                            }
                            const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET)
                            res.cookie("t", token, { expiry: new Date() + 9999 })
                    
                            const { _id, name,  email } = newUser;
                            return res.json({ token, user: { _id, name,  email } })
                        })
                    }
                }
            })
        }
    })

}
 */
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], 
    userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admin resourse! Access denied'
        });
    }
    next();
};