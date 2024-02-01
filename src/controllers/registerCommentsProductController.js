const registerCommentsProductService = require("../services/registerCommentsProductServices");

const registerCommentsProductController = {
    registerComments: async (req, res) => {
        const {
            comment,
            userId,
            productId,
        } = req.body;

        await registerCommentsProductService.register({
            comment,
            userId,
            productId,
        })

        return res.status(200).json({ message: "Comentário adicionado com sucesso!" });
    }
}

module.exports = registerCommentsProductController;