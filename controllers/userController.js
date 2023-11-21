const User = require("../Models/userModel")
const bcrypt = require("bcryptjs")
const generateToken = require("../config/generateToken")

const createUser = async(req, res) => {
    try {
        const {firstname, lastname, email, password, phone} = req.body;
        const isExists = await User.findOne({email});
        if(isExists) return res.status(401).json("User already Exists")

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            firstname,
            lastname,
            email,
            phone,
            password : hashedPass
        })
        if(newUser){
            res.status(200).json("New User Created")
        }
        else res.status(400).json("No User created")

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(user || user.password !== null){
            const isValidPass = await bcrypt.compare(password, user.password);
            if(isValidPass){
                res.status(200).json({
                    msg : "Login Successfull",
                    token : generateToken({
                        id : user.id,
                        password : user.password,
                    }),
                    user : {
                        firstname : user.firstname,
                        lastname : user.lastname,
                        email : user.email,
                        phone : user.phone
                    }
                })
            }
            else res.status(400).json("Wrong Password")
        }
        else res.status(404).json("No User found")

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports = {createUser, loginUser}