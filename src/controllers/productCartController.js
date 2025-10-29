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

    listProductCart: async (req, res) => {
        const productsInCart = await saveProductCartService.listAll()
        return res.status(200).json({ productsInCart });
    },

    updateProductCart: async (req, res) => {
        const {
            id,
            quantity
        } = req.body;

        console.log({
            id,
            quantity
        })

        await saveProductCartService.update({ id, quantity });

        return res.status(200).json({ message: "Produto atualizado com sucesso!" })
    }
}

module.exports = saveProductCartController;
