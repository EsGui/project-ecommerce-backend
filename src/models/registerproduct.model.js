const RegisterProductsModel = (sequelize, DataTypes) => {
    const RegisterProducts = sequelize.define("RegisterProducts", {
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        image: DataTypes.STRING,
        description: DataTypes.STRING,
        category: DataTypes.STRING,
        userId: DataTypes.INTEGER
    }, {
        tableName: "register_products"
    });

    RegisterProducts.associate = (db) => {
        RegisterProducts.belongsTo(db.Register, { as: "userProduct", foreignKey: "userId" })
    }
    
    return RegisterProducts;
}

module.exports = RegisterProductsModel;