const saveNotificationController = {
    saveNotification: (req, res) => {
        const {
            message,
            image
        } = req.body
    },

    listNotification: (req, res) => {
        return res.status(200).json({ message: "Listar notificações" })
    }
}

module.exports = saveNotificationController;