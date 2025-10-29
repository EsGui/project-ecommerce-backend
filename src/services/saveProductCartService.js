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
            return {
                message: "Produto salvo!",
                status: 200,
            }
        }

        return {
            message: "O produto já esta salvo!",
            status: 400
        }

    },

    delete: async ({
        id
    }) => {
        await RegisterProductsCart.destroy({
            where: { id }
        })

        return {
            message: "Produto deletado com sucesso",
            status: 200
        }
    },

    listAll: async () => {
        const productInCart = await RegisterProductsCart.findAll();
        return {
            message: productInCart,
            status: 200
        };
    },

    update: async ({
        id,
        quantity
    }) => {
        await RegisterProductsCart.update(
            { quantity },
            { where: { id }}
        )

        return {
            message: "Produto atualizado com sucesso!",
            status: 200
        }
    } 
}

module.exports = saveProductCartService
