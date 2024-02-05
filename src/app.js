const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors");
const registerUserController = require("./controllers/registerUserController");
const loginUserController = require("./controllers/loginUserController");
const registerProductController = require("./controllers/registerProductController");
const saveProductCartController = require("./controllers/saveProductCartController");
const multerImageProduct = require("./uploadArquivos/uploadImageProduct");
const registerCommentsProductController = require("./controllers/registerCommentsProductController");
const registerResponseCommentsController = require("./controllers/registerResponseCommentsController");

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

// Rota de deletar produtos
app.post("/delete-product", registerProductController.deleteProduct);

// Rota de cadastro de comentários dos produtos
app.post("/register-comments-product", registerCommentsProductController.registerComments);

// Rota de resposta aos comentários dos produtos
app.post("/register-response-comment", registerResponseCommentsController.saveComment);

// Rota para listar produto especifico
app.post("/list-product-especific", registerProductController.listProductSpecific)

// Rota de salvar produto no carrinho
app.post("/cart", saveProductCartController.saveProduct)

// Rota de listar produtos no carrinho
app.get("/list-cart", saveProductCartController.listProductCart);

// Rota de deletar produtos do carrinho
app.post("/delete-cart", saveProductCartController.deleteProduct);

// Rota de atualizar produtos do carrinho
app.post("/update-cart", saveProductCartController.updateProductCart)

module.exports = app;