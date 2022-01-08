const router = require("express").Router();
const { getBlogById, getAllBlogsByUserId } = require("../db/blogDataAccess");
const withAuth = require("../utils/auth");

//Main Dashboard route
router.get("/", withAuth, (req, res) => {
    getAllBlogsByUserId(req.session.userId)
        .then((blogs) => {
            res.render("dashboard", {
                blogs,
                loggedIn: req.session.loggedIn,
                fullName: req.session.fullName,
            });
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
            res.render("blog/edit", {
                blog,
                loggedIn: req.session.loggedIn,
                fullName: req.session.fullName,
            });
            })
            .catch((err) => {
            console.log(err);
            });
    });
    
    //New blog Route
    router.get("/new", withAuth, (req, res) => {
        res.render("new-blog", {
            loggedIn: req.session.loggedIn,
            fullName: req.session.fullName,
        });
    });
    
    //Delete blog route
    router.get("/delete/:id", withAuth, (req, res) => {
        getBlogById(req.params.id)
            .then((blog) => {
                res.render("blog/delete", {
                    blog,
                    loggedIn: req.session.loggedIn,
                    fullName: req.session.fullName,
                });
            })
            .catch((err) => {
            console.log(err);
            });
});

//Edit blog comments route
router.get("/edit-comments/:id", withAuth, (req, res) => {
    getBlogById(req.params.id)
        .then((blog) => {
            console.log(blog);
            res.render("comments/edit", {
                blog,
                loggedIn: req.session.loggedIn,
                fullName: req.session.fullName,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;