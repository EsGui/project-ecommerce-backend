const { CommentsProduct } = require("../models");

const registerCommentsProductService = {
    register: async ({
        comment, 
        userId, 
        productId
    }) => {
        await CommentsProduct.create({
            comment, 
            userId, 
            productId
        });

        return {
            message: "Comentário adicionado com sucesso!",
            status: 200
        }
    }
}

module.exports = registerCommentsProductService