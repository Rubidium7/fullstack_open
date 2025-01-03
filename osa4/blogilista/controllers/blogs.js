const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
	const blog = new Blog(request.body);
	blog.likes = blog.likes || 0;
	if (!blog.title) {
		return response.status(400).json({
			error: "title is missing",
		});
	}
	if (!blog.url) {
		return response.status(400).json({
			error: "url is missing",
		});
	}
	const result = await blog.save();
	response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response, next) => {
	await Blog.findByIdAndDelete(request.params.id);
	response.status(204).end();
});

module.exports = blogsRouter;
