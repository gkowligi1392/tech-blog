const sequelize = require("../config/connection");

const { Blog, Comment, User } = require("../models");

function getAllBlogs() {
    return new Promise((resolve, reject) => {
        Blog.findAll({
        include: [
            {
            model: Comment,
            include: [
                {
                model: User,
                attributes: ["email", "firstName", "lastName"],
                },
            ],
            },
        ],
        })
        .then((dbBlogData) => {
            const blogData = dbBlogData.map((blog) => blog.get({ plain: true }));
            resolve(blogData);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

function getBlogById(id) {
    return new Promise((resolve, reject) => {
        Blog.findOne({
        where: {
            id: id,
        },
        include: [
            {
                model: User,
                attributes: ["email", "firstName", "lastName"],
            },
            {
            model: Comment,
            include: [
                {
                model: User,
                attributes: ["email", "firstName", "lastName"],
                },
            ],
            },
        ],
        })
        .then((dbBlogData) => {
            const blogData = dbBlogData.get({ plain: true });
            resolve(blogData);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

function getAllBlogsByUserId(userId) {
    return new Promise((resolve, reject) => {
        Blog.findAll({
            where: {
            UserId: userId,
            },
            include: [
            {
                model: Comment,
                include: [
                {
                    model: User,
                    attributes: ["email", "firstName", "lastName"],
                },
                ],
            },
            ],
        })
            .then((dbBlogData) => {
            const blogData = dbBlogData.map((blog) => blog.get({ plain: true }));
            resolve(blogData);
            })
            .catch((err) => {
            reject(err);
            });
    });
}

module.exports = {
    getAllBlogs,
    getBlogById,
    getAllBlogsByUserId,
};