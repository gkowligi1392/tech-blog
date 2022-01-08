const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");

// GET route for getting all users
router.get("/", (req, res) => {
    User.findAll({
        attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "createdAt",
        "updatedAt",
        ],
    })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
});

//GET route for getting one user
router.get("/:id", (req, res) => {
    User.findOne({
        where: {
        id: req.params.id,
        },
        attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "createdAt",
        "updatedAt",
        ],
        include: [
        {
            model: Blog,
            attributes: ["id", "title", "body", "createdAt", "updatedAt"],
            include: [
            {
                model: Comment,
                attributes: ["id", "comment", "createdAt", "updatedAt"],
            },
            ],
        },
        ],
    })
        .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        res.json(dbUserData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
});

//POST route for creating a user
router.post("/", (req, res) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    });

    //PUT route for updating a user
    router.put("/:id", (req, res) => {
    User.update(
        {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        },
        {
        where: {
            id: req.params.id,
        },
        }
    )
        .then((dbUserData) => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        res.json(dbUserData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
});

//POST route for logging in a user
router.post("/login", (req, res) => {
    User.findOne({
        where: {
        email: req.body.email,
        },
    })
        .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user found with this email" });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(401).json({ message: "Incorrect password" });
            return;
        }

        console.log("User info:", dbUserData.dataValues);

        req.session.save(() => {
            req.session.userId = dbUserData.dataValues.id;
            req.session.username = dbUserData.dataValues.email;
            req.session.loggedIn = true;

            res.json({ message: "You are now logged in!" });
        });
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
});

//POST route for logging out a user
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
        res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;