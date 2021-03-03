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

			pages: allPrismicPage {
				edges {
					node {
						alternateLanguages: alternate_languages {
							lang
							uid
						}
						id
						lang
						uid
					}
				}
			}

			posts: allPrismicPost {
				edges {
					node {
						alternateLanguages: alternate_languages {
							lang
							uid
						}
						firstPublicationDate: first_publication_date
						id
						lang
						uid
					}
				}
			}
		}
	`);

	// Homepages
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

	// Pages
	result.data.pages.edges.forEach(({ node }) => {
		const { alternateLanguages, id, lang, uid } = node;
		const langCode = lang.split("-")[0];
		const prefix = "en" === langCode ? "/" : `/${langCode}/`;
		const path = `${prefix}${uid}`;

		const translations = {};
		alternateLanguages.forEach(translation => {
			const transLangCode = translation.lang.split("-")[0];
			translations[transLangCode] = translation.uid;
		});

		createPage({
			component: require.resolve("./src/templates/page.tsx"),
			context: {
				id,
				locale: lang,
				translations,
				type: "page",
				uid,
			},
			path,
		});
	});

	// Posts
	result.data.posts.edges.forEach(({ node }) => {
		const { alternateLanguages, firstPublicationDate, id, lang, uid } = node;
		const langCode = lang.split("-")[0];
		const prefix = "en" === langCode ? "/" : `/${langCode}/`;

		const translations = {};
		alternateLanguages.forEach(translation => {
			const transLangCode = translation.lang.split("-")[0];
			translations[transLangCode] = translation.uid;
		});

		const date = new Date(firstPublicationDate);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const path = `${prefix}blog/${year}/${month}/${uid}`;

		createPage({
			component: require.resolve("./src/templates/post.tsx"),
			context: {
				id,
				locale: lang,
				translations,
				type: "post",
				uid,
			},
			path,
		});
	});

	const locales = ["en-us", "de-ch", "ja-jp"];

	// Blog pages
	const postsPerPage = 6;

	const numPages = locales.map(locale => {
		const numPosts = result.data.posts.edges.filter(
			post => locale === post.node.lang
		).length;

		return {
			locale,
			pages: Math.ceil(numPosts / postsPerPage),
		};
	});

	numPages.forEach(({ locale, pages }) => {
		const lang = locale.substr(0, 2);
		const prefix = "en" === lang ? "/" : `/${lang}/`;

		createPage({
			component: require.resolve("./src/templates/blog.tsx"),
			context: {
				limit: postsPerPage,
				locale,
				page: 0,
				pages,
				skip: 0,
				type: "blog",
			},
			path: `${prefix}blog`,
		});

		for (let i = 1; i < pages; i++) {
			const path = `${prefix}blog/${i + 1}`;

			createPage({
				component: require.resolve("./src/templates/blog.tsx"),
				context: {
					limit: postsPerPage,
					locale,
					page: i,
					pages,
					skip: postsPerPage * i,
					type: "blog",
				},
				path,
			});
		}
	});
};
