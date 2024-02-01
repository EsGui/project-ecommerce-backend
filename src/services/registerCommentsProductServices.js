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
    }
}

module.exports = registerCommentsProductService