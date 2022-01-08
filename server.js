const path = require("path");
const express = require("express");
const { User, Blog, Comment } = require("./models");

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});