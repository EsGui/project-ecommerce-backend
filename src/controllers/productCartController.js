const saveProductCartService = require("../services/saveProductCartService");

const saveProductCartController = {
    saveProduct: async (req, res) => {
        const cart = await saveProductCartService.save(req.body);
        return res.status(cart.status).json({ message: cart.message })
    },

    deleteProduct: async (req, res) => {
        const destroy = await saveProductCartService.delete(req.body);
        return res.status(destroy.status).json({ message: destroy.message })
    },

    listProductCart: async (_req, res) => {
        const product = await saveProductCartService.listAll()
        return res.status(product.status).json({ message: product.message });
    },

    updateProductCart: async (req, res) => {
        const update = await saveProductCartService.update(req.body);
        return res.status(update.status).json({ message: update.message })
    }
}

module.exports = saveProductCartController;
