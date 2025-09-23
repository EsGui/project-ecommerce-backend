const CommentsProductModel = (sequelize, DataTypes) => {
    const CommentsProduct = sequelize.define("CommentsProduct", {
        comment: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
    }, {
        tableName: "comments_product"
    });

    CommentsProduct.associate = (db) => {
        CommentsProduct.belongsTo(db.Register, { as: "commentUser", foreignKey: "userId" });
        CommentsProduct.belongsTo(db.RegisterProducts, { as: "commentProduct", foreignKey: "productId" })
        CommentsProduct.hasMany(db.ResponseComment, { as: "commentResponse", foreignKey: "commentId" })
    }

    return CommentsProduct;
}

module.exports = CommentsProductModel;
