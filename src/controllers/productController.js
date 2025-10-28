const registerProductService = require("../services/registerProductService")
const fs = require("fs");

const registerProductController = {
    registerProduct: async (req, res) => {
        const register = await registerProductService.registerProduct(req)
        return res.status(register.status).json({ message: register.message });
    },

    listProduct: async (_req, res) => {
        const products = await registerProductService.listProducts()
        return res.status(products.status).json(products.message)
    },

    listProductSpecific: async (req, res) => {
        const product = await registerProductService.listProductSpecific(req.body);
        return res.status(product.status).json(product.message)
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