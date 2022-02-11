const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

const cors = require("cors")


dotenv.config();
const AuthRouter = require("./routes/auth")
const UserRouter = require("./routes/user")
const CategoryRouter = require("./routes/category")
const ProductRouter = require("./routes/product")



app.get("/", (req, res) => {
    res.send("hemlo from backend");
})
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cookieParser());



mongoose.connect(process.env.MONGO_URI , {useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
    console.log("mongoose is connected")
}).catch((error) =>{
    console.log(error)
});

app.use("/api/" , AuthRouter)
app.use("/api/" , UserRouter)
app.use("/api/" , CategoryRouter)
app.use("/api/" , ProductRouter)

app.listen(PORT, () => {
    console.log("server is connected");
})