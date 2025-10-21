const { Register, RegisterProducts, RegisterProductsCart } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const loginUserService = {
    validateData: async ({
        userName, 
        password, 
        confirmPassword,
        firstName,
        lastName,
        email,
    }) => {
        const arrayData = [
            firstName,
            lastName,
            userName,
            email,
            password,
            confirmPassword,
        ]
        const user = await Register.findOne({ where: { userName } })
        if (arrayData.some((element) => element.length == 0)) {
            return {
                status: 400,
                message: "Por favor! preencha todos os campos",
            }
        } else if (user) {
            return {
                status: 400,
                message: "Nome de usuário já existe",
            }
        } else if (password != confirmPassword) {
            return {
                status: 400,
                message: "Senha e confirmação de senha não conferem",
            }
        }

        const cryptPassword = await bcrypt.hash(password, 10);

        await Register.create({
            firstName,
            lastName,
            userName,
            email,
            password: cryptPassword,
        })

        return {
            status: 200,
            message: "Cadastro realizado com sucesso!",
        }
    },

    validateLogin: async ({ email, password }) => {
        
        if (!email || !password) {
            return {
                status: 400,
                message: "Por favor! preencha todos os campos",
            }
        } 

        const user = await Register.findOne({ where: { email } });
        const comparePassword = user && bcrypt.compare(password, user.password);
        
        if (!user && !comparePassword) {
            return {
                status: 401,
                message: "Não autorizado!",
            }
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET);
        
        return {
            status: 200,
            message: { token }
        }
    },

    persistLoginService: async ({ authorization }) => {
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
            return {
                status: 400,
                message: "Algo deu errado!",
            }
        }

        return {
            status: 200,
            message: user,
        }
    }
}

module.exports = loginUserService;
