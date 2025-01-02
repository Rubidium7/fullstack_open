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

	if (favorite_blog === null) return null;

	return {
		title: favorite_blog.title,
		author: favorite_blog.author,
		likes: favorite_blog.likes,
	};
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
};
