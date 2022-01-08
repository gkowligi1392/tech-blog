const router = require("express").Router();
const { getAllBlogs, getBlogById } = require("../db/blogDataAccess");

//GET home page
router.get("/", (req, res) => {
    getAllBlogs()
        .then((blogs) => {
        res.render("home", { blogs });
        })
        .catch((err) => {
        console.log(err);
        });
});

//GET blog by id
router.get("/blog/:id", (req, res) => {
    getBlogById(req.params.id)
        .then((blog) => {
        console.log(blog);
        res.render("blog", { blog });
        })
        .catch((err) => {
        console.log(err);
        });
});

module.exports = router;