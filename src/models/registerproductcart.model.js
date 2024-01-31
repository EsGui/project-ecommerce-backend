const RegisterProductsCartModel = (sequelize, DataTypes) => {
    const RegisterProductsCart = sequelize.define("RegisterProductsCart", {
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        image: DataTypes.STRING,
        category: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER
    }, {
        tableName: "register_products_cart"
    });

    RegisterProductsCart.associate = (db) => {
        RegisterProductsCart.belongsTo(db.Register, { as: "cartProductUser", foreignKey: "userId" })
    }

    return RegisterProductsCart;
}

module.exports = RegisterProductsCartModel;