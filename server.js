const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const sequelizeStore = require("connect-session-sequelize")(session.Store);

//Define middleware for express session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        cookie: {
            maxAge: 60000,
        },
        resave: false,
        saveUninitialized: true,
        store: new sequelizeStore({
            db: sequelize,
        }),
    })
);

//Define handlebars helpers
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });

// Define the view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Define middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//add the router in the controller
app.use(require("./controllers"));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});