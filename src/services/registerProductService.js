const { RegisterProducts, Register, CommentsProduct, ResponseComment } = require("../models")

const registerProductService = {
    registerProduct: async ({
        name,
        price,
        total,
        slug,
        image,
        description,
        userId,
        category,
}) => {
        await RegisterProducts.create({
            name,
            price,
            total,
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
                    { model: Register, as: "commentUser" },
                    { model: ResponseComment, as: "commentResponse" }
                ]}
            ],
        });
        return product;
    },
    deleteProduct: async ({ id }) => {
        await RegisterProducts.destroy({ where: { id } })
    }
}

module.exports = registerProductService;