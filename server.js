const path = require("path");
const express = require("express");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");

//Define middleware for express session
app.use(
    session({
        secret: "keyboard cat",
        cookie: {
            maxAge: 60000,
        },
        resave: false,
        saveUninitialized: true,
    })
);

// Define middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//add the router in the controller
app.use(require("./controllers"));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});