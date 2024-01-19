const express = require("express")

const app = express();

// Rota inicial
app.get("/", (req, res) => {
    return res.status(200).json("Hello world!");
});

// Rota de cadastro
app.post("/cadastro", (req, res) => {
    const {
        firstName,
        lastName,
        userName,
        email,
        password,
        confirmPassword,
    } = req.body;
});

// Rota de login/autenticação (administrador/cliente)
app.post("/login", (req, res) => {
    const {
        email,
        password
    } = req.body;
});

// Rota de cadastro de produto,
app.post("/", (res, req) => {
    const {
        name,
        price,
        image,
        description,
        category,
    } = req.body
});

// Rota de listar produtos
app.get("/list-product", async (req, res) => {
    return res.status(200).json({ message: "Listar produtos na tela inicial" })
});

// Rota de salvar produto no carrinho
app.post("/cart", (req, res) => {
    const {
        name,
        price,
        image,
    } = req.body
})

// Rota de listar produtos no carrinho
app.get("/list-cart", () => {
    return res.status(200).json({ message: "Listar produtos no carrinho" });
});

// Rota de salvar produtos comprados
app.post("/save-product-purchased", () => {
    const {
        name,
        image,
        price
    } = req.res
});

// Rota de listar produtos comprados
app.get("/list-product-purchased", (req, res) => {
    return res.status(200).json({ message: "Listar produtos comprados" })
});

// Rota de salvar notificações
app.post("/save-notification", (req, res) => {
    const {
        message,
        image
    } = req.body
})

// Rota de listar notificações
app.get("/list-notification", (req, res) => {
    return res.status(200).json({ message: "Listar notificações" })
})


// Rota de salvar mensagens privadas dos usuários
app.post("/save-message", (req, res) => {
    const {
        message,
    } = req.body;
})

// Rota de listar mensagens privadas dos usuários
app.get("/list-message", (req, res) => {
    return res.status(200).json({ message: "Listar mensagens privadas dos usuários" })
})


module.exports = app;