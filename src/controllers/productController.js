const registerProductService = require("../services/registerProductService")

const registerProductController = {
    registerProduct: async (req, res) => {
        const register = await registerProductService.registerProduct(req)
        return res.status(register.status).json({ message: register.message });
    },

    listProduct: async (_req, res) => {
        const products = await registerProductService.listProducts()
        return res.status(products.status).json({ message: products.message})
    },

    listProductSpecific: async (req, res) => {
        const product = await registerProductService.listProductSpecific(req.body);
        return res.status(product.status).json({ message: product.message })
    },

    deleteProduct: async (req, res) => {
        const productService =  await registerProductService.deleteProduct(req.body);
        return res.status(productService.status).json({ message: productService.message })
    },

    searchProduct: async (req, res) => {
        const product = await registerProductService.searchProduct(req.body);
        return res.status(product.status).json({ message: product.message })
    }
}

module.exports = registerProductController;