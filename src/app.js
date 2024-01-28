const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors");
const registerUserController = require("./controllers/registerUserController");
const loginUserController = require("./controllers/loginUserController");
const registerProductController = require("./controllers/registerProductController");
const saveProductCartController = require("./controllers/saveProductCartController");
const saveProductPurchased = require("./controllers/saveProductPurchased");
const saveNotificationController = require("./controllers/saveNotificationsController");
const multerImageProduct = require("./uploadArquivos/uploadImageProduct")

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(express.static('src/uploads'));

// Rota inicial
app.get("/", (req, res) => {
    return res.status(200).json("Hello world!");
});

// Rota de cadastro
app.post("/cadastro", registerUserController.registerController);

// Rota de login/autenticação
app.post("/login", loginUserController.loginController);

// Persistir login de usuário
app.post("/persist-login", loginUserController.persistLogin)

// Rota de cadastro de produto,
app.post("/register-product", multerImageProduct.single("file"), registerProductController.registerProduct);

// Rota de listar produtos
app.get("/list-product", registerProductController.listProduct);

// Rota de salvar produto no carrinho
app.post("/cart", saveProductCartController.saveProduct)

// Rota de listar produtos no carrinho
app.get("/list-cart", saveProductCartController.listProductCart);

// Rota de salvar produtos comprados
app.post("/save-product-purchased", saveProductPurchased.saveProduct);

// Rota de listar produtos comprados
app.get("/list-product-purchased", saveProductPurchased.listProduct);

// Rota de salvar notificações
app.post("/save-notification", saveNotificationController.saveNotification)

// Rota de listar notificações
app.get("/list-notification", saveNotificationController.listNotification);

module.exports = app;