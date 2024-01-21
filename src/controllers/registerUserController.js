const loginUserService = require("../services/loginUserService");

const registerUserController = {
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

        await loginUserService.createUser({
            firstName,
            lastName,
            userName,
            email,
            password,
            confirmPassword,
        })

        return res.status(200).json({ message: "Cadastro realizado com sucesso!" });
    }
}

module.exports = registerUserController;
