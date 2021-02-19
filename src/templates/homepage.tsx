import { Carousel, CarouselItem, CarouselTrack } from "../components/Carousel";
import { Context } from "../components/Context";
import { FluidObject } from "gatsby-image";
import { Link } from "../components/Link";
import { PostPreview } from "../components/PostPreview";
import React from "react";
import { RichTextBlock } from "prismic-reactjs";
import { getTranslation } from "../utils/translation.util";
import { graphql } from "gatsby";
import styled from "styled-components";

const SeeMore = styled(Link)`
	align-items: center;
	border: 0;
	border-radius: 0.5em;
	box-shadow: ${({ theme }): string =>
		`0 0 1px ${theme.colors.separatorShadow}`};
	display: flex;
	font-family: ${({ theme }): string => theme.fonts.heading};
	font-size: 1.4em;
	height: 100%;
	justify-content: center;
	width: 100%;
`;

const LatestPost = styled(CarouselItem)`
	margin: 1px;
	padding-left: 1em;
	width: 60vw;

	&:last-child {
		padding-right: 1em;
	}

	@media (min-width: ${({ theme }): string => `${theme.breakpoints.sm}px`}) {
		width: 50vw;
	}

	@media (min-width: ${({ theme }): string => `${theme.breakpoints.md}px`}) {
		padding-left: 2em;

		&:last-child {
			padding-right: 2em;
		}
	}

	@media (min-width: ${({ theme }): string => `${theme.breakpoints.lg}px`}) {
		padding-left: 0;
		width: 100%;

		&:last-child {
			padding-right: 0;
		}
	}
`;

interface LatestPostsProps {
	$count: number;
}

const LatestPosts = styled(Carousel)<LatestPostsProps>`
	margin: 1em 0;

	${CarouselTrack} {
		@media (min-width: ${({ theme }): string => `${theme.breakpoints.lg}px`}) {
			display: grid;
			gap: 2em;
			grid-template-columns: ${({ $count }): string =>
				`repeat(${$count}, 1fr)`};
		}
	}
`;

const LatestPostsSection = styled("section")`
	margin: 0 auto;
	max-width: ${({ theme }): string => theme.sizes.content};

	@media (min-width: ${({ theme }): string => `${theme.breakpoints.lg}px`}) {
		padding: 0 2em;

		h2 {
			padding: 0;
		}
	}
`;

interface Props {
	data: {
		posts: {
			edges: {
				node: {
					data: {
						featuredImage?: {
							alt?: string;
							thumbnails?: {
								mobileCard?: {
									localFile?: {
										childImageSharp: {
											fluid: FluidObject;
										};
									};
								};
							};
						};
						title?: {
							raw: RichTextBlock[];
						};
					};
					firstPublicationDate: string;
					id: string;
					lang?: string;
					uid?: string;
				};
			}[];
		};
	};
}

class HomepageTemplate extends React.Component<Props> {
	render(): React.ReactNode {
		const posts = this.props.data.posts.edges;

		return (
			<Context.Consumer>
				{(context): React.ReactElement => (
					<>
						{posts.length && (
							<LatestPostsSection>
								<h2>{getTranslation("latest-posts", context.locale)}</h2>
								<LatestPosts
									$count={Math.min(Math.max(posts.length + 1, 3), 4)}
								>
									{posts.map(
										({ node }): React.ReactElement => (
											<LatestPost key={node.id}>
												<PostPreview post={node} />
											</LatestPost>
										)
									)}

									<LatestPost>
										<SeeMore to={""}>
											{getTranslation("see-more-posts", context.locale)}
										</SeeMore>
									</LatestPost>
								</LatestPosts>
							</LatestPostsSection>
						)}
					</>
				)}
			</Context.Consumer>
		);
	}
}

export default HomepageTemplate;

export const query = graphql`
	query HomepageQuery($locale: String!) {
		posts: allPrismicPost(limit: 3, filter: { lang: { eq: $locale } }) {
			edges {
				node {
					data {
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
