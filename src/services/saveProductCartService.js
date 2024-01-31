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
    },

    delete: async ({
        id
    }) => {
        await RegisterProductsCart.destroy({
            where: { id }
        })
    },

    listAll: async () => {
        const productInCart = await RegisterProductsCart.findAll();
        return productInCart;
    }
}

module.exports = saveProductCartService
