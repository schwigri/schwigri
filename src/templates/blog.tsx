import { SiteContext } from "../context/site.context";
import { Pagination } from "../components/Pagination";
import { PostPreview } from "../components/PostPreview";
import { PrismicPost } from "../types/prismic.types";
import React from "react";
import { Seo } from "../components/Seo";
import { Translation } from "../constants/translation.constants";
import { getTranslation } from "../utils/translation.util";
import { graphql } from "gatsby";
import styled from "styled-components";

const PostsGrid = styled("section")`
	display: grid;
	gap: 1em;
	margin: 0 auto 4em;
	max-width: ${({ theme }): string => theme.sizes.content};
	padding: 0 1em;

	@media (min-width: ${({ theme }): string => `${theme.breakpoints.sm}px`}) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: ${({ theme }): string => `${theme.breakpoints.md}px`}) {
		gap: 2em;
		grid-template-columns: repeat(3, 1fr);
		padding: 0 2em;
	}
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
							{posts.map(({ node }) => (
								<PostPreview key={node.id} post={node} />
							))}
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
								mobileCard: mobile_card {
									localFile {
										childImageSharp {
											gatsbyImageData(placeholder: BLURRED, width: 720)
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
