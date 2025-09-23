const registerCommentsProductService = require("../services/registerCommentsProductServices");
const registerResponseCommentsService = require("../services/registerResponseCommentsService")

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
    },

    saveComment: async (req, res) => {
        const {
            response,
            userId,
            commentId,
        } = req.body;

        const responseComment = await registerResponseCommentsService.list({ commentId })

        // if (!responseComment) {
        //     await registerResponseCommentsService.save({
        //         response,
        //         userId,
        //         commentId,
        //     });
        //     return res.status(200).json({ message: "Resposta enviada com sucesso!" })
        // }
        
        // return res.status(400).json({ message: "O comentário já tem uma resposta, você pode edita-lo!" })

        await registerResponseCommentsService.save({
                response,
                userId,
                commentId,
        });
        return res.status(200).json({ message: "Resposta enviada com sucesso!" })
    }
}

module.exports = registerCommentsProductController;