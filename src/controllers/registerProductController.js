const registerProductController = {
    registerProduct: (res, req) => {
        const {
            name,
            price,
            image,
            description,
            category,
        } = req.body
    },

    listProduct: (req, res) => {
        return res.status(200).json({ message: "Listar produtos na tela inicial" })
    }
}

module.exports = registerProductController;