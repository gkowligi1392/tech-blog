const router = require("express").Router();
const { User, Comment, Blog } = require("../../models");

//GET route for getting all comments
router.get("/", (req, res) => {
    Comment.findAll({
        include: [
        {
            model: User,
            attributes: ["email", "firstName", "lastName"],
        },
        {
            model: Post,
            attributes: ["title"],
        },
        ],
    })
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
});

//GET route for getting a comment by id
router.get("/:id", (req, res) => {
    Comment.findOne({
        where: {
        id: req.params.id,
        },
        include: [
        {
            model: User,
            attributes: ["email", "firstName", "lastName"],
        },
        {
            model: Blog,
            attributes: ["title"],
        },
        ],
    })
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
});

//POST route for creating a comment
router.post("/", (req, res) => {
    Comment.create({
        comment: req.body.comment,
        UserId: req.session.userId,
        BlogId: req.body.blogId,
    })
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
});

//PUT route for updating a comment
router.put("/:id", (req, res) => {
    Comment.update(
        {
        comment: req.body.comment,
        },
        {
        where: {
            id: req.params.id,
        },
        }
    )
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
});

//DELETE route for deleting a comment
router.delete("/:id", (req, res) => {
    Comment.destroy({
        where: {
        id: req.params.id,
        },
    })
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
});

module.exports = router;