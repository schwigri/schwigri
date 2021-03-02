const {
	NODE_ENV,
	URL: NETLIFY_SITE_URL = "https://www.schwigri.com",
	DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
	CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env;

const siteUrl =
	"production" === NETLIFY_ENV ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

const path = require("path");
require("dotenv").config({
	path: `.env.${NODE_ENV}`,
});

const disallowedPolicy = {
	host: null,
	policy: [{ disallow: ["/"], userAgent: "*" }],
	sitemap: null,
};

module.exports = {
	siteMetadata: {
		siteUrl,
		title: "Griffen Schwiesow",
	},
	plugins: [
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
		{
			resolve: "gatsby-plugin-robots-txt",
			options: {
				env: {
					"branch-deploy": { ...disallowedPolicy },
					"deploy-preview": { ...disallowedPolicy },
					development: { ...disallowedPolicy },
					production: {
						policy: [{ allow: "/", userAgent: "*" }],
					},
				},
				host: "https://www.schwigri.com",
				resolveEnv: () => NETLIFY_ENV,
				sitemap: "https://www.schwigri.com/sitemap.xml",
			},
		},
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				background_color: "#ffffff",
				display: "browser",
				icon: path.join(__dirname, "src", "graphics", "icon.png"),
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
		{
			resolve: "@rhysforyou/gatsby-plugin-safari-site-icon",
			options: {
				color: "#1467ff",
				icon: path.join(__dirname, "src", "graphics", "icon.svg"),
			},
		},
		"gatsby-plugin-sitemap",
		{
			resolve: "gatsby-plugin-offline",
			options: {
				workboxConfig: {
					globPatterns: ["**/icon-path*"],
					runtimeCaching: [
						{
							handler: "NetworkFirst",
							urlPattern: /^https?:.*\/page-data\/app-data\.json/,
						},
						{
							handler: "NetworkFirst",
							urlPattern: /^https?:.*\/page-data\/.*\/page-data\.json/,
						},
					],
				},
			},
		},
	],
};
