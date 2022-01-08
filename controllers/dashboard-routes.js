const router = require("express").Router();
const { getAllBlogs, getBlogById } = require("../db/blogDataAccess");

//Main Dashboard route
router.get("/", (req, res) => {
    getAllBlogs()
        .then((blogs) => {
        res.render("dashboard", { blogs });
        })
        .catch((err) => {
        console.log(err);
        });
});

module.exports = router;