const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        maxLength : 20,
    },
    lastname : {
        type : String,
        required : true,
        maxLength : 20,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
        min : 8,
    },
    phone : {
        type : Number,
        required : true,
        maxLength : 10,
    }
},
{timestamps: true}
)

const User = mongoose.model("User", UserSchema)

module.exports = User