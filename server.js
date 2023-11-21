const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoutes = require("./Routes/userRoutes")

dotenv.config();
connectDB()

const app = express()
app.use(express.json())

app.use("/api/auth", userRoutes)
app.all("*", (req, res)=> res.status(404).send("Page not found"))
const PORT = process.env.PORT || 7002

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))