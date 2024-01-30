const { RegisterProductsCart } = require("../models")

const saveProductCartService = {
    save: async ({
        name,
        price,
        image,
        userId,
        productId,
        category,
    }) => {
        await RegisterProductsCart.create({
            name,
            price,
            image,
            userId,
            productId,
            category,
        })
    }
}

module.exports = saveProductCartService
