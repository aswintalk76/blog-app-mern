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
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const blog = await blogModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        );
        return res.status(200).send({
            success: true,
            message: "Blog Updated!",
            blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error WHile Updating Blog",
            error,
        });
    }
};

//SIngle Blog
exports.getBlogByIdController = async (req, res) => {
    // console.log("getBlogByIdController")
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "blog not found with this is",
            });
        }
        return res.status(200).send({
            success: true,
            message: "fetch single blog",
            blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error while getting single blog",
            error,
        });
    }
};

//Delete Blog
exports.deleteBlogController = async (req, res) => {
    // console.log("deleteBlogController")
};

//GET USER BLOG
exports.userBlogControlller = async (req, res) => {
    // console.log("userBlogControlller")
};
