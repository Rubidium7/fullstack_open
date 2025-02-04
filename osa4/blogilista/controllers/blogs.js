const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	if (blog) {
		response.json(blog);
	} else {
		response.status(404).end();
	}
});

blogsRouter.post("/", async (request, response) => {
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

blogsRouter.put("/:id", async (request, response) => {
	const body = request.body;

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
	});
	response.json(updatedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
	await Blog.findByIdAndDelete(request.params.id);
	response.status(204).end();
});

module.exports = blogsRouter;
