const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
	const users = await User.find({});
	response.json(users);
});

usersRouter.post("/", async (request, response) => {
	const { name, username, password } = request.body;

	const saltRounds = 8;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({ name, username, passwordHash });

	const result = await user.save();
	response.status(201).json(result);
});

module.exports = usersRouter;
