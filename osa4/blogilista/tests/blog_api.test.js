const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const initialBlogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0,
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 14,
		__v: 0,
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 3,
		__v: 0,
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0,
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0,
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0,
	},
	{
		_id: "5a422bc61b54a676234d17fd",
		title: "Finnish culture...",
		author: "Linus Torvalds",
		url: "https://torvalds-family.blogspot.com/2009/12/finnish-culture.html",
		likes: 12,
		__v: 0,
	},
	{
		_id: "5a422bc61b54a676234d17fe",
		title: "Programming",
		author: "Linus Torvalds",
		url: "https://torvalds-family.blogspot.com/2009/08/programming.html",
		likes: 5,
		__v: 0,
	},
];

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

test("a valid blog can be added", async (t) => {
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

after(async () => {
	await mongoose.connection.close();
});
