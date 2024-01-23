const { Register } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");


const loginUserController = {
    loginController: async (req, res) => {
        const {
            email,
            password
        } = req.body;

        const user = await Register.findOne({ where: { email } });
        const comparePassword = user && bcrypt.compare(password, user.password);
        
        if (!user && !comparePassword) {
            return res.status(401).json({ message: "Não autorizado!" });
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET);

        return res.status(200).json({ token })
    }
}

module.exports = loginUserController
