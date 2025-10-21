require("dotenv").config();
const loginUserService = require("../services/loginUserService");

const loginUserController = {
    loginController: async (req, res) => {
        const auth = await loginUserService.validateLogin(req.body)
        return res.status(auth.status).json({ message: auth.message.token })
    },

    persistLogin: async (req, res) => {
        const persist = await loginUserService.persistLoginService(req.headers)
        return res.status(persist.status).json({ message: persist.message })
    },

    registerController: async (req, res) => {
        const validate = await loginUserService.validateData(req.body)
        return res.status(validate.status).json({ message: validate.message });
    }
}

module.exports = loginUserController
