const RegisterModel = (sequelize, DataTypes) => {
    const Register = sequelize.define("Register", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        userName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });
    return Register;
}

module.exports = RegisterModel;
