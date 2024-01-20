const registerUserController = {
    registerController: (req, res) => {
        const {
            firstName,
            lastName,
            userName,
            email,
            password,
            confirmPassword,
        } = req.body;
    
        console.log({
            firstName,
            lastName,
            userName,
            email,
            password,
            confirmPassword,
        })
    }
}

module.exports = registerUserController;