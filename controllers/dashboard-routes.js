const router = require("express").Router();
const { getBlogById, getAllBlogsByUserId } = require("../db/blogDataAccess");
const withAuth = require("../utils/auth");

//Main Dashboard route
router.get("/", withAuth, (req, res) => {
    getAllBlogsByUserId(req.session.userId)
        .then((blogs) => {
            res.render("dashboard", { blogs, loggedIn: req.session.loggedIn });
        })
        .catch((err) => {
            console.log(err);
        });
    });
    //Edit blog route
    router.get("/edit/:id", withAuth, (req, res) => {
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
    router.get("/new", withAuth, (req, res) => {
        res.render("new-blog", { loggedIn: req.session.loggedIn });
    });
    
    //Delete blog route
    router.get("/delete/:id", withAuth, (req, res) => {
        getBlogById(req.params.id)
            .then((blog) => {
            res.render("delete-blog", { blog, loggedIn: req.session.loggedIn });
            })
            .catch((err) => {
            console.log(err);
            });
});

module.exports = router;