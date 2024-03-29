const saveProductCartService = require("../services/saveProductCartService");

const saveProductCartController = {
    saveProduct: async (req, res) => {
        const {
            name,
            price,
            quantity,
            total,
            image,
            userId,
            productId,
            category,
        } = req.body;

        await saveProductCartService.save({
            name,
            price,
            quantity,
            total,
            image,
            userId,
            productId,
            category,
        });
        
        return res.status(200).json({ message: "Produto salvo no carrinho" })
    },

    deleteProduct: async (req, res) => {
        const { id } = req.body;
        await saveProductCartService.delete({ id });
        return res.status(200).json({ message: "Produto deletado com sucesso" })
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
