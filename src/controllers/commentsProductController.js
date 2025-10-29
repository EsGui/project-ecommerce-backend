const registerCommentsProductService = require("../services/registerCommentsProductServices");
const registerResponseCommentsService = require("../services/registerResponseCommentsService")

const registerCommentsProductController = {
    registerComments: async (req, res) => {
        const register = await registerCommentsProductService.register(req.body)
        return res.status(register.status).json({ message: register.message });
    },

    saveComment: async (req, res) => {
        const register = await registerResponseCommentsService.save(req.body);
        return res.status(register.status).json({ message: register.message })
    }
}

module.exports = registerCommentsProductController;