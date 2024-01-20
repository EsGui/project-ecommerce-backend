const saveProductPurchased = {
    saveProduct: (req, res) => {
        const {
            name,
            image,
            price
        } = req.res
    },

    listProduct: (req, res) => {
        return res.status(200).json({ message: "Listar produtos comprados" })
    }
}

module.exports = saveProductPurchased;