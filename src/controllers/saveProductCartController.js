const saveProductCartService = require("../services/saveProductCartService");

const saveProductCartController = {
    saveProduct: async (req, res) => {
        const {
            name,
            price,
            image,
            userId,
            productId,
            category,
        } = req.body

        console.log({
            name,
            price,
            image,
            userId,
            productId,
            category,
        })

        // await saveProductCartService.save({
        //     name,
        //     price,
        //     image,
        //     userId,
        //     productId,
        //     category,
        // })
    },

    listProductCart: (req, res) => {
        return res.status(200).json({ message: "Listar produtos no carrinho" });
    }
}

module.exports = saveProductCartController