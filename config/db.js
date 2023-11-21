const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const connectDB = async()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        })
        console.log("MongoDB is connected Successfully")
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB