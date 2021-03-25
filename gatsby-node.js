const KuromojiAnalyzer = require("kuroshiro-analyzer-kuromoji");
const Kuroshiro = require("kuroshiro");
const slugify = require("slugify");

const kuroshiro = new Kuroshiro();

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions;

	const result = await graphql(`
		{
			site {
				siteMetadata {
					siteUrl
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
							document {
								... on PrismicPost {
									firstPublicationDate: first_publication_date
								}
							}
							lang
							uid
						}
						id
						lang
						lastPublicationDate: last_publication_date
						firstPublicationDate: first_publication_date
						tags
						uid
					}
				}
				tags: group(field: tags) {
					fieldValue
					nodes {
						lang
					}
				}
			}
		}
	`);

	await kuroshiro.init(new KuromojiAnalyzer());

	const getLangCode = lang => (lang ? lang.split("-")[0] : "en");
	const getPrefix = lang => ("en" === lang ? "/" : `/${lang}/`);

	const locales = ["en-us", "de-ch", "ja-jp"];
	const allTags = {};

	const site = result.data.site;

	// Collect tags
	result.data.posts.tags.forEach(({ fieldValue, nodes }) => {
		allTags[fieldValue] = { lang: getLangCode(nodes[0].lang) };
	});

	// Posts
	result.data.posts.edges.forEach(({ node }) => {
		const { alternateLanguages, id, lang, firstPublicationDate, uid } = node;
		const langCode = getLangCode(lang);
		const prefix = getPrefix(langCode);

		const translations = {};
		alternateLanguages.forEach(translation => {
			const transLangCode = translation.lang.split("-")[0];
			translations[transLangCode] = {
				date: translation.document.firstPublicationDate,
				uid: translation.uid,
			};
		});

		const date = new Date(firstPublicationDate);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const path = `${prefix}blog/${year}/${month}/${uid}`;

		createPage({
			component: require.resolve("./src/templates/post.tsx"),
			context: {
				allTags,
				date: firstPublicationDate,
				id,
				locale: lang,
				site,
				translations,
				type: "post",
				uid,
			},
			path,
		});
	});

	// Tag pages
	await Promise.all(
		Object.entries(allTags).map(async ([tag, { lang }]) => {
			const prefix = getPrefix(lang);
			const slug =
				"ja" === lang
					? await kuroshiro.convert(tag, { to: "romaji" })
					: slugify(tag, { locale: lang });
			allTags[tag].uid = slug;
			const path = `${prefix}blog/tag/${slug}`;

			createPage({
				component: require.resolve("./src/templates/tag.tsx"),
				context: {
					locale: lang,
					site,
					tag,
					type: "tag",
					uid: slug,
				},
				path,
			});
		})
	);

	// Work pages
	const workSlugs = {
		en: "works",
		de: "portfolio",
		ja: "jisseki",
	};
	locales.forEach(locale => {
		const langCode = getLangCode(locale);
		const prefix = getPrefix(langCode);
		const path = `${prefix}${workSlugs[langCode]}`;

		createPage({
			component: require.resolve("./src/templates/works.tsx"),
			context: {
				locale,
				site,
				type: "works",
			},
			path,
		});
	});

	// Homepages
	result.data.homepages.edges.forEach(({ node }) => {
		const { id, lang } = node;
		const langCode = getLangCode(lang);
		const permalink = getPrefix(langCode);

		createPage({
			component: require.resolve("./src/templates/homepage.tsx"),
			context: {
				allTags,
				id,
				locale: lang,
				site,
				type: "homepage",
			},
			path: permalink,
		});
	});

	// Pages
	result.data.pages.edges.forEach(({ node }) => {
		const { alternateLanguages, id, lang, uid } = node;
		const langCode = getLangCode(lang);
		const prefix = getPrefix(langCode);
		const path = `${prefix}${uid}`;

		const translations = {};
		alternateLanguages.forEach(translation => {
			const transLangCode = translation.lang.split("-")[0];
			translations[transLangCode] = { uid: translation.uid };
		});

		createPage({
			component: require.resolve("./src/templates/page.tsx"),
			context: {
				allTags,
				id,
				locale: lang,
				site,
				translations,
				type: "page",
				uid,
			},
			path,
		});
	});

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
		const lang = getLangCode(locale);
		const prefix = "en" === lang ? "/" : `/${lang}/`;

		createPage({
			component: require.resolve("./src/templates/blog.tsx"),
			context: {
				allTags,
				limit: postsPerPage,
				locale,
				page: 0,
				pages,
				site,
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
					allTags,
					limit: postsPerPage,
					locale,
					page: i,
					pages,
					site,
					skip: postsPerPage * i,
					type: "blog",
				},
				path,
			});
		}
	});
};
