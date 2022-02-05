const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

const UserRouter = require("./routes/user")
dotenv.config();
app.get("/", (req, res) => {
    res.send("hemlo from backend");
})

app.use(bodyParser.json())
app.use(morgan("dev"));
app.use(cookieParser());



mongoose.connect(process.env.MONGO_URI , {useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
    console.log("mongoose is connected")
}).catch((error) =>{
    console.log(error)
});
app.use("/api/" , UserRouter)

app.listen(PORT, () => {
    console.log("server is connected");
})