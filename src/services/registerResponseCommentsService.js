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
    },

    list: async ({ commentId }) => {
        const response = await ResponseComment.findOne({ where: { commentId } });
        return response;
    },
}

module.exports = registerResponseCommentsService;