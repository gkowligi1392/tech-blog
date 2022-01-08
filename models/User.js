const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
        },
        firstName: {
        type: DataTypes.STRING(35),
        allowNull: false,
        validate: {
            len: [2, 35],
        },
        },
        lastName: {
        type: DataTypes.STRING(35),
        allowNull: false,
        validate: {
            len: [2, 35],
        },
        },
        password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 100],
        },
        },
    },
    {
        hooks: {
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(
            updatedUserData.password,
            10
            );
            return updatedUserData;
        },
        },
        sequelize,
    }
);

module.exports = User;