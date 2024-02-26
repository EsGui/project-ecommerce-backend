const { Register, RegisterProducts, RegisterProductsCart } = require("../models");
const loginUserService = require("../services/loginUserService");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const loginUserController = {
    loginController: async (req, res) => {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Por favor, Preencha todos os campos!" })
        }

        const user = await Register.findOne({ where: { email } });
        const comparePassword = user && bcrypt.compare(password, user.password);
        
        if (!user && !comparePassword) {
            return res.status(401).json({ message: "Não autorizado!" });
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET);

        return res.status(200).json({ token })
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
