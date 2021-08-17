require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
	siteMetadata: {
		description: "",
		siteUrl: "https://www.schwigri.com",
		title: "Griffen Schwiesow",
	},
	plugins: [
		"gatsby-plugin-image",
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		{
			resolve: "gatsby-plugin-styled-components",
			options: {
				displayName: "development" !== process.env.NODE_ENV,
			},
		},
		{
			resolve: "gatsby-source-strapi",
			options: {
				apiURL: process.env.STRAPI_URL,
				collectionTypes: [
					{
						api: { qs: { _locale: "all" } },
						name: "page",
					},
				],
				loginData:
					"production" === process.env.NODE_ENV
						? {
								identifier: process.env.STRAPI_EMAIL,
								password: process.env.STRAPI_PASSWORD,
						  }
						: undefined,
				singleTypes: [
					{
						api: { qs: { _locale: "de" } },
						name: "homepage",
					},
					{
						api: { qs: { _locale: "en" } },
						name: "homepage",
					},
					{
						api: { qs: { _locale: "fr" } },
						name: "homepage",
					},
					{
						api: { qs: { _locale: "it" } },
						name: "homepage",
					},
					{
						api: { qs: { _locale: "ja" } },
						name: "homepage",
					},
					{
						api: { qs: { _locale: "rm" } },
						name: "homepage",
					},
					{
						name: "i18n/locales",
					},
					{
						api: { qs: { _locale: "de" } },
						name: "site",
					},
					{
						api: { qs: { _locale: "en" } },
						name: "site",
					},
					{
						api: { qs: { _locale: "fr" } },
						name: "site",
					},
					{
						api: { qs: { _locale: "it" } },
						name: "site",
					},
					{
						api: { qs: { _locale: "ja" } },
						name: "site",
					},
					{
						api: { qs: { _locale: "rm" } },
						name: "site",
					},
				],
			},
		},
		"gatsby-plugin-sitemap",
		{
			resolve: "gatsby-plugin-robots-txt",
			options: {
				env: {
					development: {
						host: null,
						policy: [{ disallow: ["/"], userAgent: "*" }],
						sitemap: null,
					},
					production: {
						policy: [{ allow: "/", userAgent: "*" }],
					},
					host: "https://www.schwigri.com",
					sitemap: "https://www.schwigri.com/sitemap.xml",
				},
			},
		},
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				background_color: "#ffffff",
				display: "browser",
				icon: require.resolve("./src/graphics/icon.png"),
				icons: [
					{
						purpose: "any maskable",
						sizes: "512x512",
						src: require.resolve("./src/graphics/maskable-icon.png"),
						type: "image/png",
					},
				],
				lang: "en",
				name: "Griffen Schwiesow",
				short_name: "Griffen",
				start_url: "/",
				theme_color: "#1467ff",
				localize: [
					{ lang: "de", start_url: "/de/" },
					{ lang: "fr", start_url: "/fr/" },
					{ lang: "it", start_url: "/it/" },
					{ lang: "rm", start_url: "/rm/" },
					{
						lang: "ja",
						name: "グリフィン・シュヴィーゾー",
						short_name: "グリフィン",
						start_url: "/ja/",
					},
				],
			},
		},
	],
};
