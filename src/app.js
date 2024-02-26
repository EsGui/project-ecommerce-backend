const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors");
const multerImageProduct = require("./uploadArquivos/uploadImageProduct");
const userControler = require("./controllers/userController");
const productController = require("./controllers/productController");
const commentsProductController = require("./controllers/commentsProductController");
const productCartController = require("./controllers/productCartController");

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
app.post("/cadastro", userControler.registerController);

// Rota de login/autenticação
app.post("/login", userControler.loginController);

// Persistir login de usuário
app.post("/persist-login", userControler.persistLogin)

// Rota de cadastro de produto,
app.post("/register-product", multerImageProduct.single("file"), productController.registerProduct);

// Rota de listar produtos
app.get("/list-product", productController.listProduct);

// Rota de deletar produtos
app.post("/delete-product", productController.deleteProduct);

// Rota de cadastro de comentários dos produtos
app.post("/register-comments-product", commentsProductController.registerComments);

// Rota de resposta aos comentários dos produtos
app.post("/register-response-comment", commentsProductController.saveComment);

// Rota para listar produto especifico
app.post("/list-product-especific", productController.listProductSpecific)

// Rota de salvar produto no carrinho
app.post("/cart", productCartController.saveProduct)

// Rota de listar produtos no carrinho
app.get("/list-cart", productCartController.listProductCart);

// Rota de deletar produtos do carrinho
app.post("/delete-cart", productCartController.deleteProduct);

// Rota de atualizar produtos do carrinho
app.post("/update-cart", productCartController.updateProductCart)

module.exports = app;