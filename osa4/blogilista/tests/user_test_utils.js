const User = require("../models/user");

const initialUsers = [
	{
		_id: "5a422a851b54a676234d17f7",
		name: "Michael Chan",
		username: "Mikko",
		passwordHash: "password123",
		__v: 0,
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		name: "Edsger W. Dijkstra",
		username: "Ekku",
		passwordHash: "password123",
		__v: 0,
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		name: "Robert C. Martin",
		username: "Roope",
		passwordHash: "password123",
		__v: 0,
	},
	{
		_id: "5a422bc61b54a676234d17fd",
		name: "Linus Torvalds",
		username: "Linuksi",
		passwordHash: "password123",
		__v: 0,
	},
];

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((u) => u.toJSON());
};

module.exports = {
	initialUsers,
	usersInDb,
};
