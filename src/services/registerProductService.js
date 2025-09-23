const { RegisterProducts, Register, CommentsProduct, ResponseComment } = require("../models")

const registerProductService = {
    registerProduct: async ({
        name,
        price,
        total,
        fileNameImage,
        slug,
        image,
        description,
        userId,
        category,
}) => {
        await RegisterProducts.create({
            name,
            price,
            fileNameImage,
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
                    { model: ResponseComment, as: "commentResponse", include: [
                        { model: Register, as: "registerResponse" }
                    ] }
                ]}
            ],
        });
        return product;
    },

    listProductId: async ({ id }) => {
        const product = await RegisterProducts.findOne({ where: { id } });
        return product
    },

    deleteProduct: async ({ id }) => {
        await RegisterProducts.destroy({ where: { id } })
    },

    searchProduct: async (nameProduct) => {
        const product = await RegisterProducts.findAll({
            where: { name: nameProduct }
        });

        return product;
    }
}

module.exports = registerProductService;