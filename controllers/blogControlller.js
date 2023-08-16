const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

//GET ALL BLOGS
exports.getAllBlogsController = async (req, res) => {
    // console.log("getAllBlogsController")
};

//Create Blog
exports.createBlogController = async (req, res) => {
    // console.log("createBlogController")
    try {
        const { title, description, image, user } = req.body;
        //validation
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Please Provide ALl Fields",
            });
        }
        const exisitingUser = await userModel.findById(user);
        //validaton
        if (!exisitingUser) {
            return res.status(404).send({
                success: false,
                message: "unable to find user",
            });
        }

        const newBlog = new blogModel({ title, description, image, user });
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session });
        exisitingUser.blogs.push(newBlog);
        await exisitingUser.save({ session });
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success: true,
            message: "Blog Created!",
            newBlog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error WHile Creting blog",
            error,
        });
    }
};

//Update Blog
exports.updateBlogController = async (req, res) => {
    // console.log("updateBlogController")
};

//SIngle Blog
exports.getBlogByIdController = async (req, res) => {
    // console.log("getBlogByIdController")
};

//Delete Blog
exports.deleteBlogController = async (req, res) => {
    // console.log("deleteBlogController")
};

//GET USER BLOG
exports.userBlogControlller = async (req, res) => {
    // console.log("userBlogControlller")
};
