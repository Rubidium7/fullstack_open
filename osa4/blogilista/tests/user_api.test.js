const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const User = require("../models/user");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const { initialUsers, usersInDb } = require("./user_test_utils");

describe("with initial users in database", () => {
	beforeEach(async () => {
		await User.deleteMany({});
		await User.insertMany(initialUsers);
	});

	test("normal user creation work", async () => {
		const usersAtStart = await usersInDb();

		const newUser = {
			name: "Heikki Mattinen",
			username: "Heksi",
			password: "Pfds4311",
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const usersNow = await usersInDb();
		assert.strictEqual(usersNow.length, usersAtStart.length + 1);

		//TODO test is new user found
	});
});

after(async () => {
	await mongoose.connection.close();
});
