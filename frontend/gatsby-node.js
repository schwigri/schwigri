const getPath = (locale = "en", type = "page", slug) => {
	const prefix = "en" === locale ? "/" : `/${locale}/`;

	switch (type) {
		default:
			return `${prefix}${slug && slug !== "" ? `${slug}/` : ""}`;
	}
};

module.exports = {
	createPages: async ({ actions: { createPage }, graphql }) => {
		const result = await graphql(`
			{
				homepages: allStrapiHomepage {
					nodes {
						id
						locale
						primaryColor
					}
				}

				pages: allStrapiPage {
					nodes {
						id
						locale
						localizations {
							id
							locale
						}
						primaryColor
						slug
						strapiId
					}
				}
			}
		`);

		await Promise.all(
			result.data.homepages.nodes.map(
				async ({ id, locale, primaryColor }) =>
					await createPage({
						component: require.resolve("./src/templates/homepage.template.tsx"),
						context: { id, locale, primaryColor },
						path: getPath(locale, "homepage"),
					})
			)
		);

		await Promise.all(
			result.data.pages.nodes.map(
				async ({ id, locale, localizations, primaryColor, slug }) => {
					const translations = {};

					localizations.forEach(localization => {
						const target = result.data.pages.nodes.find(
							search => search.strapiId === localization.id
						);
						if (target) {
							translations[localization.locale] = {
								id: target.id,
								slug: target.slug,
							};
						}
					});

					await createPage({
						component: require.resolve("./src/templates/page.template.tsx"),
						context: { id, locale, primaryColor, translations },
						path: getPath(locale, "page", slug),
					});
				}
			)
		);
	},
};
