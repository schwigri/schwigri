const path = require("path");
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
	siteMetadata: {
		title: "Griffen Schwiesow",
	},
	plugins: [
		{
			resolve: "gatsby-source-prismic",
			options: {
				accessToken: process.env.PRISMIC_ACCESS_TOKEN,
				repositoryName: process.env.PRISMIC_REPOSITORY_NAME,
				schemas: {
					homepage: require("./src/.schemas/homepage.schema.json"),
					page: require("./src/.schemas/page.schema.json"),
					post: require("./src/.schemas/post.schema.json"),
				},
				shouldDownloadImage: () => true,
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "graphics",
				path: path.join(__dirname, "src", "graphics"),
			},
		},
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
	],
};
