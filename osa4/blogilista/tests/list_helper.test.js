const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

const empty_list = [];
const one_blog = [
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0,
	},
];
const six_blogs = [
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
		likes: 5,
		__v: 0,
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
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
];

const seven_blogs = [
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
		likes: 5,
		__v: 0,
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
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
];

const eight_blogs = [
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

test("dummy returns one", () => {
	const result = listHelper.dummy(empty_list);
	assert.strictEqual(result, 1);
});

describe("total likes", () => {
	test("of empty list is zero", () => {
		const result = listHelper.totalLikes(empty_list);
		assert.strictEqual(result, 0);
	});

	test("when list has only one blog, equals the likes of that", () => {
		const result = listHelper.totalLikes(one_blog);
		assert.strictEqual(result, 5);
	});

	test("of a bigger list is calculated right", () => {
		const result = listHelper.totalLikes(six_blogs);
		assert.strictEqual(result, 36);
	});
});

describe("blog with most likes", () => {
	test("of empty list is null", () => {
		const result = listHelper.favoriteBlog(empty_list);
		assert.strictEqual(result, null);
	});
	test("when list has only one blog, returns it", () => {
		const expected_result = {
			title: one_blog[0].title,
			author: one_blog[0].author,
			likes: one_blog[0].likes,
		};
		const result = listHelper.favoriteBlog(one_blog);
		assert.deepStrictEqual(result, expected_result);
	});
	test("of six blogs finds correct one", () => {
		const expected_result = {
			title: six_blogs[2].title,
			author: six_blogs[2].author,
			likes: six_blogs[2].likes,
		};
		const result = listHelper.favoriteBlog(six_blogs);
		assert.deepStrictEqual(result, expected_result);
	});
	test("when two has the same amount of likes, returns first one", () => {
		const expected_result = {
			title: seven_blogs[2].title,
			author: seven_blogs[2].author,
			likes: seven_blogs[2].likes,
		};
		const result = listHelper.favoriteBlog(seven_blogs);
		assert.deepStrictEqual(result, expected_result);
	});
});

describe("author with most likes", () => {
	test("of empty list is null", () => {
		const result = listHelper.mostLikes(empty_list);
		assert.strictEqual(result, null);
	});
	test("when list has only one blog, returns it", () => {
		const expected_result = {
			author: one_blog[0].author,
			likes: one_blog[0].likes,
		};
		const result = listHelper.mostLikes(one_blog);
		assert.deepStrictEqual(result, expected_result);
	});
	test("of six blogs finds correct one", () => {
		const expected_result = {
			author: six_blogs[2].author,
			likes: 17,
		};
		const result = listHelper.mostLikes(six_blogs);
		assert.deepStrictEqual(result, expected_result);
	});
	test("when two has the same amount of likes, returns first one", () => {
		const expected_result = {
			author: eight_blogs[2].author,
			likes: 17,
		};
		const result = listHelper.mostLikes(eight_blogs);
		assert.deepStrictEqual(result, expected_result);
	});
});
