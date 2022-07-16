const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

const authRoutes = require("./routes/auth");
const stockRoutes = require("./routes/stock");

connectDB();

app.use(express.json());
app.use(cors());

app.get("/", ( req, res ) => {
    res.status(200).json({
        api: "Version 1"
    })
});

app.use("/api/v1", authRoutes);
app.use("/api/v1", stockRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server Running on ${PORT}`);
})