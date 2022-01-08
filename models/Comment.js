const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
    {
        comment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 255],
        },
        },
    },
    { sequelize }
);

module.exports = Comment;