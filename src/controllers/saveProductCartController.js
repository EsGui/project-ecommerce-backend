const saveProductCartController = {
    saveProduct: (req, res) => {
        const {
            name,
            price,
            image,
        } = req.body
    },

    listProductCart: (req, res) => {
        return res.status(200).json({ message: "Listar produtos no carrinho" });
    }
}

module.exports = saveProductCartController