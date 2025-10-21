const registerProductService = require("../services/registerProductService")
const fs = require("fs");

const registerProductController = {
    registerProduct: async (req, res) => {
        const register = await registerProductService.registerProduct(req)
        return res.status(register.status).json({ message: register.message });
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

        const deleteImageProduct = await registerProductService.listProductId({ id });

        fs.unlinkSync(`./src/uploads/image-product/${ deleteImageProduct.fileNameImage }`)

        await registerProductService.deleteProduct({ id });

        return res.status(200).json({ message: "Produto deletado com sucesso" })
    },

    searchProduct: async (req, res) => {
        const {
            nameProduct
        } = req.body;

        const searchProduct = await registerProductService.searchProduct(nameProduct);

        if (!searchProduct) {
            return res.status(400).json({ message: "Produto não encontrado" })
        }

        return res.status(200).json({ searchProduct })
    }
}

module.exports = registerProductController;