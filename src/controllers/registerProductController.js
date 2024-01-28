const registerProductService = require("../services/registerProductService")

const registerProductController = {
    registerProduct: async (req, res) => {
        const {
            name,
            price,
            description,
            userId,
            category,
        } = req.body

        console.log({
            name,
            price,
            description,
            userId,
            category,
        })

        await registerProductService.registerProduct({
            name,
            price,
            image: `http://localhost:3001/image-product/${req.file.filename}`,
            description,
            userId,
            category,
        })

        // http://localhost:3001/image-product/${req.file.pathname}

        return res.status(200).json({ message: "Cadastrando produto" })
    },

    listProduct: async (req, res) => {
        const products = await registerProductService.listProducts()
        return res.status(200).json({ products })
    }
}

module.exports = registerProductController;