const RegisterProductsModel = (sequelize, DataTypes) => {
    const RegisterProducts = sequelize.define("RegisterProducts", {
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        total: DataTypes.INTEGER,
        fileNameImage: DataTypes.STRING,
        slug: DataTypes.STRING,
        image: DataTypes.STRING,
        description: DataTypes.STRING,
        category: DataTypes.STRING,
        userId: DataTypes.INTEGER
    }, {
        tableName: "register_products"
    });

    RegisterProducts.associate = (db) => {
        RegisterProducts.belongsTo(db.Register, { as: "userProduct", foreignKey: "userId" })
        RegisterProducts.hasMany(db.CommentsProduct, { as: "productComment", foreignKey: "productId" })
    }
    
    return RegisterProducts;
}

module.exports = RegisterProductsModel;