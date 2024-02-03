const { RegisterProductsCart } = require("../models")

const saveProductCartService = {
    save: async ({
        name,
        price,
        quantity,
        total,
        image,
        userId,
        productId,
        category,
    }) => {
        
        const validate = await RegisterProductsCart.findOne({
            where: { userId, productId },
        })

        if (!validate) {
            await RegisterProductsCart.create({
                name,
                price,
                quantity,
                total,
                image,
                userId,
                productId,
                category,
            });
        }
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
    },

    update: async ({
        id,
        quantity
    }) => {
        await RegisterProductsCart.update(
            { quantity },
            { where: { id }}
        )
    } 
}

module.exports = saveProductCartService
