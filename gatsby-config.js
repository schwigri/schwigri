const path = require("path");
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
	siteMetadata: {
		siteUrl: "https://www.schwigri.com",
		title: "Griffen Schwiesow",
	},
	plugins: [
		"gatsby-plugin-gatsby-cloud",
		"gatsby-plugin-image",
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		{
			resolve: "gatsby-plugin-styled-components",
			options: {
				displayName: "development" === process.env.NODE_ENV,
			},
		},
		{
			resolve: "gatsby-source-prismic",
			options: {
				accessToken: process.env.PRISMIC_ACCESS_TOKEN,
				repositoryName: process.env.PRISMIC_REPOSITORY_NAME,
				schemas: {
					homepage: require("./src/schemas/homepage.schema.json"),
					page: require("./src/schemas/page.schema.json"),
					post: require("./src/schemas/post.schema.json"),
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
		{
			resolve: "gatsby-plugin-robots-txt",
			options: {
				host: null,
				policy: [{ disallow: ["/"], userAgent: "*" }],
				sitemap: null,
			},
		},
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				background_color: "#ffffff",
				display: "browser",
				icon: path.join(__dirname, "src", "graphics", "icon.png"),
				icons: [
					{
						purpose: "any maskable",
						src: path.join(__dirname, "src", "graphics", "maskable-icon.png"),
						sizes: "512x512",
						type: "image/png",
					},
				],
				lang: "en",
				name: "Griffen Schwiesow",
				short_name: "Griffen",
				start_url: "/",
				theme_color: "#1467ff",
				localize: [
					{
						lang: "de",
						start_url: "/de/",
					},
					{
						lang: "ja",
						name: "グリフィン・シュヴィーゾー",
						short_name: "グリフィン",
						start_url: "/ja/",
					},
				],
			},
		},
		"gatsby-plugin-sitemap",
		"gatsby-plugin-offline",
	],
};
