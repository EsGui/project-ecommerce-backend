const validateDataProduct = require("../middlewares/validateDataProducts");
const registerProductService = require("../services/registerProductService")

const registerProductController = {
    registerProduct: async (req, res) => {
        const {
            name,
            price,
            total,
            description,
            userId,
            category,
        } = req.body;

        const validateString = validateDataProduct.validateString([name, description, category])
        const validateNumber = validateDataProduct.validateNumber([total, price]);
        const validate = [name, description, category, total, price].some((element) => element == "");

        if (validate || validateString || validateNumber) {
            return res.status(400).json({ message: "Preencha todos os campos corretamente!" })
        }

        await registerProductService.registerProduct({
            name,
            price,
            total,
            slug: name.toLowerCase().replace(/ /gi, "-"),
            image: `http://localhost:3001/image-product/${req && req.file && req.file.filename}`,
            description,
            userId,
            category,
        })

        return res.status(200).json({ message: "Produto cadastrado com sucesso" });
    },

    listProduct: async (req, res) => {
        const products = await registerProductService.listProducts()
        return res.status(200).json({ products })
    },

    listProductSpecific: async (req, res) => {
        const {
            id,
            slug
        } = req.body
        console.log(id)
        const product = await registerProductService.listProductSpecific(id, slug);
        if (!product) {
            return res.status(400).json({ error: "Produto não encontrado" });
        }
        return res.status(200).json({ product });
    },

    deleteProduct: async (req, res) => {
        const {
            id
        } = req.body;

        await registerProductService.deleteProduct({ id });

        return res.status(200).json({ message: "Produto deletado com sucesso" })
    }
}

module.exports = registerProductController;