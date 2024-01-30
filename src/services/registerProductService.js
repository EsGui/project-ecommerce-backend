const { RegisterProducts, Register } = require("../models")

const registerProductService = {
    registerProduct: async ({
        name,
        price,
        slug,
        image,
        description,
        userId,
        category,
}) => {
        await RegisterProducts.create({
            name,
            price,
            image,
            slug,
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
    },

    listProductSpecific: async (slug) => {
        const product = await RegisterProducts.findOne({ 
            where: { slug: slug },
            include: [{ model: Register, as: "userProduct", attributes: { exclude: ["password"]} }],
        });
        return product;
    }
}

module.exports = registerProductService;