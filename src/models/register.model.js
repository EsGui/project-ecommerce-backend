const RegisterModel = (sequelize, DataTypes) => {
    const Register = sequelize.define("Register", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        userName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        tableName: "register_users"
    });

    Register.associate = (db) => {
        Register.hasMany(db.RegisterProducts, { as: "productUser", foreignKey: "userId" })
        Register.hasMany(db.RegisterProductsCart, { as: "userProductCart", foreignKey: "userId" })
    }

    return Register;
}

module.exports = RegisterModel;
