import { Carousel, CarouselItem, CarouselTrack } from "../components/Carousel";
import Img, { FluidObject } from "gatsby-image";
import { PrismicHomepage, PrismicPost } from "../.types/prismic.types";
import { Context } from "../components/Context";
import { Link } from "../components/Link";
import { PostPreview } from "../components/PostPreview";
import React from "react";
import { RichText } from "prismic-reactjs";
import { getSlug } from "../utils/localization.util";
import { getTranslation } from "../utils/translation.util";
import { graphql } from "gatsby";
import styled from "styled-components";

const FeaturedContent = styled("div")`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;

	h2,
	h3,
	h4,
	h5,
	h6,
	p {
		padding: 0;
	}
`;

const FeaturedImage = styled("div")`
	border-radius: 0.5em;
	box-shadow: ${({ theme }): string =>
		`0 0 1px ${theme.colors.separatorShadow}`};
	overflow: hidden;
`;

const FeaturedWrapper = styled("section")`
	display: grid;
	gap: 1em;
	margin: 4em auto;
	max-width: ${({ theme }): string => theme.sizes.content};
	padding: 0 1em;

	@media (min-width: ${({ theme }): string => `${theme.breakpoints.sm}px`}) {
		gap: 2em;
		grid-template-columns: repeat(2, 1fr);
		padding: 0 2em;
	}
`;

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
	margin: 4em auto;
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
		homepage: PrismicHomepage;
		posts: {
			edges: {
				node: PrismicPost;
			}[];
		};
		profilePhoto: {
			childImageSharp: {
				fluid: FluidObject;
			};
		};
	};
}

class HomepageTemplate extends React.Component<Props> {
	render(): React.ReactNode {
		const posts = this.props.data.posts.edges;
		const { homepage, profilePhoto } = this.props.data;

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
										<SeeMore
											to={getSlug({ locale: context.locale, type: "blog" })}
										>
											{getTranslation("see-more-posts", context.locale)}
										</SeeMore>
									</LatestPost>
								</LatestPosts>
							</LatestPostsSection>
						)}

						<FeaturedWrapper>
							<FeaturedImage>
								<Img
									alt={getTranslation("profile-photo-alt", context.locale)}
									fluid={profilePhoto.childImageSharp.fluid}
								/>
							</FeaturedImage>

							<FeaturedContent>
								<RichText render={homepage.data?.title?.raw} />
								{homepage.data?.description?.text && (
									<p dangerouslySetInnerHTML={{ __html: homepage.data.description.text }} />
								)}
							</FeaturedContent>
						</FeaturedWrapper>
					</>
				)}
			</Context.Consumer>
		);
	}
}

export default HomepageTemplate;

export const query = graphql`
	query HomepageQuery($locale: String!) {
		homepage: prismicHomepage(lang: { eq: $locale }) {
			data {
				description {
					text
				}
				title {
					raw
				}
			}
		}
		posts: allPrismicPost(limit: 3, filter: { lang: { eq: $locale } }) {
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
		profilePhoto: file(relativePath: { eq: "profile.jpeg" }) {
			childImageSharp {
				fluid(maxWidth: 700) {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`;
