const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Blog extends Model {}

Blog.init(
    {
        body: {
        type: DataTypes.TEXT,
        allowNull: false,
        },
        title: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    },
    {
        sequelize,
    }
);

module.exports = Blog;