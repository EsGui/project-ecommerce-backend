const validateDataProduct = require("../middlewares/validateDataProducts");
const { RegisterProducts, Register, CommentsProduct, ResponseComment } = require("../models")
const fs = require("fs");

const registerProductService = {
    registerProduct: async (req) => {
        const {
            name,
            price,
            total,
            description,
            userId,
            category,
        } = req.body

        const validateString = validateDataProduct.validateString([name, description, category])
        const validateNumber = validateDataProduct.validateNumber([Number(total), Number(price)]);
        const validate = [name, description, category, total, price].some((element) => !element);

         if (validate || validateString || validateNumber) {
            return {
                status: 400,
                message: "Preencha todos os campos corretamente!"
            }

        }

        await RegisterProducts.create({
            name,
            price: Number(price),
            total: Number(total),
            slug: name.toLowerCase().replace(/ /gi, "-"),
            image: `http://localhost:3001/image-product/${req && req.file && req.file.filename}`,
            fileNameImage: `${ req && req.file && req.file.filename }`,
            description,
            userId,
            category,
        })

        return {
            status: 200,
            message: "Produto cadastrado com sucesso"
        }
    },

    listProducts: async () => {
        const products = await RegisterProducts.findAll({
            include: [{ model: Register, as: "userProduct" }]
        });
        return {
            message: {products},
            status: 200
        }
    },

    listProductSpecific: async ({id, slug}) => {
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

        if (!product) {
            return {
                message: "Produto não encontrado",
                status: 400
            }
        }

        return {
            message: product,
            status: 200
        };
    },

    listProductId: async ({ id }) => {
        const product = await RegisterProducts.findOne({ where: { id } });
        return product
    },

    deleteProduct: async ({ id }) => {
        const product = await RegisterProducts.findOne({ where: { id } });
        fs.unlinkSync(`./src/uploads/image-product/${ product.fileNameImage }`)    
        await RegisterProducts.destroy({ where: { id } })
        return {
            message: "Produto deletado com sucesso",
            status: 200
        }
    },

    searchProduct: async ({nameProduct}) => {
        const product = await RegisterProducts.findAll({
            where: { name: nameProduct },
            include: [
                {model: Register, as: "userProduct"}
            ]
        });

        
        if (!product) {
            return {
                message: "Produto não encontrado",
                status: 400
            }
        }

        return {
            message: product,
            status: 200
        }
    }
}

module.exports = registerProductService;