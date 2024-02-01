const { RegisterProducts, Register, CommentsProduct } = require("../models")

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

    listProductSpecific: async (id, slug) => {
        const product = await RegisterProducts.findOne({ 
            where: { id, slug },
            include: [
                { model: Register, as: "userProduct", attributes: { exclude: ["password"]} },
                { model: CommentsProduct, as: "productComment", include: [
                    {  model: Register, as: "commentUser" }
                ]}
            ],
        });
        return product;
    }
}

module.exports = registerProductService;