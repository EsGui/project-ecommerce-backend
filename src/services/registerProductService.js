const { RegisterProducts, Register } = require("../models")

const registerProductService = {
    registerProduct: async ({
        name,
        price,
        image,
        description,
        userId,
        category,
}) => {
        await RegisterProducts.create({
            name,
            price,
            image,
            description,
            userId,
            category,
        })
    },

    listProducts: async () => {
        const products = await RegisterProducts.findAll({
            include: [{ model: Register, as: "userProduct" }]
        });
        return products
    }
}

module.exports = registerProductService;