const loginUserController = {
    loginController: (req, res) => {
        const {
            email,
            password
        } = req.body;

        console.log(email, password)
    }
}

module.exports = loginUserController