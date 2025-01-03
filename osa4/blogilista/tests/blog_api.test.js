const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const { initialBlogs, nonExistingId } = require("./test_utils");

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(initialBlogs);
});

test("get works", async () => {
	const response = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);

	assert.strictEqual(response.body.length, initialBlogs.length);

	//I know this is extra, just wanted to figure out how to do it
	//and obvi this doesn't work if the order of the blogs is shuffled around in the backend
	for (i = 0; i < initialBlogs.length; i++) {
		const { __v, ...strippedBlog } = initialBlogs[i];
		Object.assign(strippedBlog, { ["id"]: strippedBlog["_id"] });
		delete strippedBlog["_id"];

		assert.deepStrictEqual(response.body[i], strippedBlog);
	}
});

test("is id not _id", async () => {
	const response = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);

	const blogs = response.body;

	blogs.forEach((blog) => {
		assert(Object.hasOwn(blog, "id"));
		assert(!Object.hasOwn(blog, "_id"));
	});
});

describe("testing post", () => {
	test("a valid blog can be added", async () => {
		const newBlog = {
			title: "Debugging hell",
			author: "Linus Torvalds",
			url: "https://torvalds-family.blogspot.com/2008/12/debugging-hell.html",
			likes: 43,
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const response = await api.get("/api/blogs");

		assert.strictEqual(response.body.length, initialBlogs.length + 1);

		//TODO make backend check that added url is unique?
		for (i = 0; i < response.body.length; i++) {
			const { id, ...strippedBlog } = response.body[i];
			if (strippedBlog.url === newBlog.url) {
				assert.deepStrictEqual(strippedBlog, newBlog);
			}
		}
	});

	test("if blog with no likes is posted, backend defaults the like amount to zero", async () => {
		const newBlog = {
			title: "Debugging hell",
			author: "Linus Torvalds",
			url: "https://torvalds-family.blogspot.com/2008/12/debugging-hell.html",
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const response = await api.get("/api/blogs");
		for (i = 0; i < response.body.length; i++) {
			if (response.body[i].url === newBlog.url)
				assert.strictEqual(response.body[i].likes, 0);
		}
	});

	test("if blog with no title is posted, it gets rejected", async () => {
		const newBlog = {
			author: "Linus Torvalds",
			url: "https://torvalds-family.blogspot.com/2008/12/debugging-hell.html",
			likes: 43,
		};

		const response = await api.post("/api/blogs").send(newBlog).expect(400);
		assert.strictEqual(response.body.error, "title is missing");
	});

	test("if blog with no url is posted, it gets rejected", async () => {
		const newBlog = {
			title: "Debugging hell",
			author: "Linus Torvalds",
			likes: 43,
		};

		const response = await api.post("/api/blogs").send(newBlog).expect(400);
		assert.strictEqual(response.body.error, "url is missing");
	});
});

describe("testing delete", () => {
	test("removing one blog", async () => {
		await api.delete(`/api/blogs/${initialBlogs[0]._id}`).expect(204);

		await api.get(`/api/blogs/${initialBlogs[0]._id}`).expect(404);

		const response = await api.get("/api/blogs").expect(200);
		assert.strictEqual(response.body.length, initialBlogs.length - 1);
		const ids = response.body.map((blog) => blog.id);
		assert(!ids.includes(initialBlogs[0]._id));
	});

	test("removing blog that doesn't exist", async () => {
		const non_existing_id = await nonExistingId();

		await api.delete(`/api/blogs/${non_existing_id}`).expect(204);

		await api.get(`/api/blogs/${non_existing_id}`).expect(404);

		const response = await api.get("/api/blogs").expect(200);
		assert.strictEqual(response.body.length, initialBlogs.length);
	});

	test("delete with a malformatted id", async () => {
		const response = await api.delete("/api/blogs/0").expect(400);

		assert.strictEqual(response.body.error, "malformatted id");
	});
});

after(async () => {
	await mongoose.connection.close();
});
