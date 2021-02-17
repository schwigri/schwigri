exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions;

	const result = await graphql(`
		{
			site {
				siteMetadata {
					title
				}
			}

			homepages: allPrismicHomepage {
				edges {
					node {
						id
						lang
					}
				}
			}
		}
	`);

	result.data.homepages.edges.forEach(({ node }) => {
		const { id, lang } = node;
		const langCode = lang.split("-")[0];
		const permalink = "en" === langCode ? "/" : `/${langCode}/`;

		createPage({
			component: require.resolve("./src/templates/homepage.tsx"),
			context: {
				id,
				locale: lang,
				type: "homepage",
			},
			path: permalink,
		});
	});
};
