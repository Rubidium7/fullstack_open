const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((sum, item) => sum + item.likes, 0);
};

const favoriteBlog = (blogs) => {
	favorite_blog = null;

	for (i = 0; i < blogs.length; i++) {
		if (favorite_blog === null || favorite_blog.likes < blogs[i].likes)
			favorite_blog = blogs[i];
	}

	if (!favorite_blog) return null;

	return {
		title: favorite_blog.title,
		author: favorite_blog.author,
		likes: favorite_blog.likes,
	};
};

const mostLikes = (blogs) => {
	authors = {};
	most_liked = null;

	for (i = 0; i < blogs.length; i++) {
		authors[blogs[i].author] = 0;
	}

	for (i = 0; i < blogs.length; i++) {
		authors[blogs[i].author] += blogs[i].likes;
	}

	for (const [key, value] of Object.entries(authors)) {
		if (!most_liked || authors[most_liked] < value) {
			most_liked = key;
		}
	}

	if (!most_liked) return null;

	return {
		author: most_liked,
		likes: authors[most_liked],
	};
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostLikes,
};
