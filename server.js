const express = require("express")
require("dotenv").config();
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoute')

const app = express();

app.use(express.json())
app.use(cors());

const port = process.env.PORT || 8000;

app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(port, ()=>{
        console.log("Connect MongoDB & Server running on port", port);
    })
})
.catch((err)=>{
    console.log(err);
})


