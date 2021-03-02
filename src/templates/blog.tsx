import { Context } from "../components/Context";
import { Pagination } from "../components/Pagination";
import { PostPreview } from "../components/PostPreview";
import { PrismicPost } from "../.types/prismic.types";
import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { getTranslation } from "../utils/translation.util";

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

const PageTitle = styled("h1")`
	margin: 4em auto 2em;
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
			<Context.Consumer>
				{(context): React.ReactElement => (
					<>
						<PageTitle>
							{getTranslation("blog", context.locale)}
							{page > 0 && (
								<span>
									{" "}
									(
									{getTranslation("page-label", context.locale, {
										page: `${page + 1}`,
									})}
									)
								</span>
							)}
						</PageTitle>

						<PostsGrid>
							{posts.map(({ node }) => (
								<PostPreview key={node.id} post={node} />
							))}
						</PostsGrid>

						{pages > 1 && <Pagination currentPage={page} numPages={pages} />}
					</>
				)}
			</Context.Consumer>
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
											fluid(maxWidth: 720) {
												...GatsbyImageSharpFluid
											}
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
					uid
				}
			}
		}
	}
`;
