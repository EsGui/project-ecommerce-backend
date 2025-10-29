const { ResponseComment } = require("../models")

const registerResponseCommentsService = {
    save: async ({
        response,
        userId,
        commentId
    }) => {
        await ResponseComment.create({
            response,
            userId,
            commentId
        })

        return {
            message: "Resposta enviada com sucesso!",
            status: 200
        }
    },

    list: async ({ commentId }) => {
        const response = await ResponseComment.findOne({ where: { commentId } });
        return response;
    },
}

module.exports = registerResponseCommentsService;