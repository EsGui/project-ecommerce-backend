const { Register } = require("../models")

const loginUserService = {
        /*
            Regras de negócio

                - Todos os campos precisam ser preenchidos
                - O nome de usuário registrado não pode existir no banco de dados
                - A senha precisa ser igual a confirmação de senha
        */

    // Esta função (validateData) valida casos de erros.
    validateData: async (arrayData, userName, password, confirmPassword) => {
        const user = await Register.findOne({ where: { userName } })
        if (arrayData.some((element) => element.length == 0)) {
            return {
                status: 400,
                message: "Por favor! preencha todos os campos",
                pass: false
            }
        } else if (user) {
            return {
                status: 400,
                message: "Nome de usuário já existe",
                pass: false
            }
        } else if (password != confirmPassword) {
            return {
                status: 400,
                message: "Senha e confirmação de senha não conferem",
                pass: false
            }
        }
        return {
            pass: true
        }
    },

    createUser: async ({
        firstName,
        lastName,
        userName,
        email,
        password,
        confirmPassword,
    }) => {
        await Register.create({
            firstName,
            lastName,
            userName,
            email,
            password,
            confirmPassword,
        })
    }
}

module.exports = loginUserService;
