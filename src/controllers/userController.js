const { Register, RegisterProducts, RegisterProductsCart } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const loginUserService = require("../services/loginUserService");

const loginUserController = {
    loginController: async (req, res) => {
        const {
            email,
            password
        } = req.body;

        const auth = await loginUserService.validateLogin(email, password)

        return res.status(auth.status).json(auth.message)
    },

    persistLogin: async (req, res) => {
        const { authorization } = req.headers
        
        const verifyToken = jwt.verify(authorization, process.env.JWT_SECRET);

        const user = await Register.findOne({ 
            where: { email: verifyToken.email }, 
            attributes: { exclude: ["password"] },
            include: [
                { model: RegisterProducts, as: "productUser" },
                { model: RegisterProductsCart, as: "userProductCart" }
            ]
        });

        if (!user) {
            return res.status(400).json({ message: "Algo deu errado!" });
        }

        return res.status(200).json(user)
    },

    registerController: async (req, res) => {
        const {
            firstName,
            lastName,
            userName,
            email,
            password,
            confirmPassword,
        } = req.body;
    
        const arrayData = [
            firstName,
            lastName,
            userName,
            email,
            password,
            confirmPassword,
        ]

        const validate = await loginUserService.validateData(arrayData, userName, password, confirmPassword)

        if (!validate.pass) {
            return res.status(validate.status).json({ message: validate.message });
        }

        const cryptPassword = await bcrypt.hash(password, 10);

        await loginUserService.createUser({
            firstName,
            lastName,
            userName,
            email,
            password: cryptPassword,
        })

        return res.status(200).json({ message: "Cadastro realizado com sucesso!" });
    }
}

module.exports = loginUserController
