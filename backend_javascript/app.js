require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const loginRouter = require("./login/loginRouter");

mongoose.connect(process.env.MONGODB_URL)

const cors = require('cors');
const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use("/api/users", loginRouter);

app.listen(port, () => {
    console.log("Server Up and Running on PORT:", port);
})
