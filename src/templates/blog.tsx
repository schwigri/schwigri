import { PageType, PrismicPost } from "../types/prismic.types";
import { getLocale, getSlug } from "../utils/localization.util";
import { Pagination } from "../components/Pagination";
import { PostHeader } from "../components/PostHeader";
import React from "react";
import { Seo } from "../components/Seo";
import { SiteContext } from "../context/site.context";
import { Translation } from "../constants/translation.constants";
import { getImage } from "gatsby-plugin-image";
import { getTranslation } from "../utils/translation.util";
import { graphql } from "gatsby";
import styled from "styled-components";

const PostsGrid = styled("section")`
	margin: 0 auto 4em;
	max-width: ${({ theme }): string => theme.sizes.content};
`;

const Header = styled("div")`
	margin: 4em 0;
	text-align: center;
`;

interface Props {
	data: {
		posts: {
			edges: {
				node: PrismicPost;
			}[];
		};
	};
	pageContext: {
		limit: number;
		page: number;
		pages: number;
		skip: number;
	};
}

class BlogTemplate extends React.Component<Props> {
	render(): React.ReactNode {
		const { limit, page, pages, skip } = this.props.pageContext;
		const allPosts = this.props.data.posts.edges;
		const posts = allPosts.slice(
			Math.max(skip, 0),
			skip + limit > allPosts.length ? undefined : limit
		);

		return (
			<SiteContext.Consumer>
				{(context): React.ReactElement => (
					<>
						<Seo
							description={getTranslation(
								Translation.BlogDescription,
								context.locale
							)}
							title={getTranslation(Translation.Blog, context.locale)}
						/>

						<Header>
							<h1>
								{getTranslation(Translation.Blog, context.locale)}
								{page > 0 && (
									<span>
										{" "}
										(
										{getTranslation(Translation.PageLabel, context.locale, {
											page: `${page + 1}`,
										})}
										)
									</span>
								)}
							</h1>
						</Header>

						<PostsGrid>
							{posts.map(({ node }) => {
								if (node.data?.title) {
									return (
										<PostHeader
											featuredImage={{
												alt: node.data.featuredImage?.alt || "",
												image: node.data.featuredImage?.thumbnails
													?.desktopHeader?.localFile
													? getImage(
															node.data.featuredImage.thumbnails.desktopHeader
																.localFile
													  )
													: undefined,
											}}
											key={node.id}
											preview={{
												excerpt: node.data?.excerpt || "",
												permalink: getSlug(
													{
														date: node.firstPublicationDate,
														id: node.id || "",
														locale: getLocale(node.lang),
														type: PageType.Post,
														uid: node.uid || "",
													},
													getLocale(node.lang)
												),
											}}
											publishedOn={new Date(node.firstPublicationDate || "")}
											tags={node.tags}
											title={node.data.title}
											updatedOn={new Date(node.lastPublicationDate || "")}
										/>
									);
								}
							})}
						</PostsGrid>

						{pages > 1 && <Pagination currentPage={page} numPages={pages} />}
					</>
				)}
			</SiteContext.Consumer>
		);
	}
}

export default BlogTemplate;

export const query = graphql`
	query BlogTemplateQuery($locale: String!) {
		posts: allPrismicPost(
			filter: { lang: { eq: $locale } }
			sort: { order: DESC, fields: first_publication_date }
		) {
			edges {
				node {
					data {
						excerpt
						featuredImage: featured_image {
							alt
							thumbnails {
								desktopHeader: desktop_header {
									localFile {
										childImageSharp {
											gatsbyImageData(
												layout: CONSTRAINED
												placeholder: BLURRED
												width: 700
											)
										}
									}
								}
							}
						}
						title {
							raw
							text
						}
					}
					firstPublicationDate: first_publication_date
					id
					lang
					lastPublicationDate: last_publication_date
					tags
					uid
				}
			}
		}
	}
`;
