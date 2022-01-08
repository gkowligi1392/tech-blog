const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");

//GET  route for getting all blogs
router.get("/", (req, res) => {
    Blog.findAll({
        include: [
        {
            model: User,
            attributes: ["email", "firstName", "lastName"],
        },
        {
            model: Comment,
            attributes: ["comment"],
            include: {
                model: User,
                attributes: ["email", "firstName", "lastName"],
            },
        },
        ],
    })
        .then((dbBlogData) => res.json(dbBlogData))
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
});

//GET route for getting a single blog
router.get("/:id", (req, res) => {
    Blog.findOne({
        where: {
        id: req.params.id,
        },
        include: [
        {
            model: User,
            attributes: ["email", "firstName", "lastName"],
        },
        {
            model: Comment,
            attributes: ["comment"],
            include: {
                model: User,
                attributes: ["email", "firstName", "lastName"],
            },
        },
        ],
    })
        .then((dbBlogData) => {
        if (!dbBlogData) {
            res.status(404).json({ message: "No blog found with this id" });
            return;
        }
        res.json(dbBlogData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
});

//POST route for creating a new blog
router.post("/", (req, res) => {
    console.log(req.session);
    const userId = req.session.userId;
    Blog.create({
        title: req.body.title,
        body: req.body.body,
        UserId: userId,
    })
        .then((dbBlogData) => res.json(dbBlogData))
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
});

//PUT route for updating a blog
router.put("/:id", (req, res) => {
    Blog.update(
        {
        title: req.body.title,
        body: req.body.body,
        },
        {
        where: {
            id: req.params.id,
        },
        }
    )
        .then((dbBlogData) => {
        if (!dbBlogData) {
            res.status(404).json({ message: "No blog found with this id" });
            return;
        }
        res.json(dbBlogData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
});

//DELETE route for deleting a blog
router.delete("/:id", (req, res) => {
    Blog.destroy({
        where: {
        id: req.params.id,
        },
    })
        .then((dbBlogData) => {
        if (!dbBlogData) {
            res.status(404).json({ message: "No blog found with this id" });
            return;
        }
        res.json(dbBlogData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
});

module.exports = router;