const router = require("express").Router();
const { getAllBlogs, getBlogById } = require("../db/blogDataAccess");

//Main Dashboard route
router.get("/", (req, res) => {
    getAllBlogs()
        .then((blogs) => {
            res.render("dashboard", { blogs, loggedIn: req.session.loggedIn });
        })
        .catch((err) => {
            console.log(err);
        });
    });
    //Edit blog route
    router.get("/edit/:id", (req, res) => {
        getBlogById(req.params.id)
            .then((blog) => {
            console.log(blog);
            res.render("edit-blog", { blog, loggedIn: req.session.loggedIn });
            })
            .catch((err) => {
            console.log(err);
            });
    });
    
    //New blog Route
    router.get("/new", (req, res) => {
        res.render("new-blog", { loggedIn: req.session.loggedIn });
    });
    
    //Delete blog route
    router.get("/delete/:id", (req, res) => {
        getBlogById(req.params.id)
            .then((blog) => {
            res.render("delete-blog", { blog, loggedIn: req.session.loggedIn });
            })
            .catch((err) => {
            console.log(err);
            });
});

module.exports = router;