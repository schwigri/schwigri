import { Carousel, CarouselItem, CarouselTrack } from "../components/Carousel";
import {
	GatsbyImage,
	IGatsbyImageData,
	getImage,
	getSrc,
} from "gatsby-plugin-image";
import { PrismicHomepage, PrismicPost } from "../types/prismic.types";
import { Context } from "../components/Context";
import { PostPreview } from "../components/PostPreview";
import React from "react";
import { RichText } from "prismic-reactjs";
import { Seo } from "../components/Seo";
import { Translation } from "../constants/translations.constants";
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

const FeaturedImage = styled(GatsbyImage)`
	border-radius: 0.5em;
	box-shadow: ${({ theme }): string =>
	`0 0 1px ${theme.colors.separatorShadow}`};
	overflow: hidden;
	width: 100%;
	z-index: 0;
`;

const FeaturedImageWrapper = styled("div")`
	align-items: center;
	display: flex;
`;

const FeaturedWrapper = styled("section")`
	display: grid;
	gap: 1em;
	margin: 4em auto;
	max-width: ${({ theme }): string => theme.sizes.content};
	padding: 0 1em;

	@media (min-width: ${({ theme }): string => `${theme.breakpoints.sm}px`}) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: ${({ theme }): string => `${theme.breakpoints.md}px`}) {
		gap: 2em;
		padding: 0 2em;
	}
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
		margin: 0;
		padding-left: 0;
		width: 100%;

		&:last-child {
			padding-right: 0;
		}
	}
`;

const LatestPosts = styled(Carousel)`
	margin: 1em 0;

	@media (min-width: ${({ theme }): string => `${theme.breakpoints.lg}px`}) {
		overflow: visible;
	}

	${CarouselTrack} {
		@media (min-width: ${({ theme }): string => `${theme.breakpoints.lg}px`}) {
			display: grid;
			gap: 2em;
			grid-template-columns: repeat(3, 1fr);
			overflow: visible;
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
		profilePhoto: IGatsbyImageData;
		socialCard: IGatsbyImageData;
		socialCardJa: IGatsbyImageData;
	};
}

class HomepageTemplate extends React.Component<Props> {
	render(): React.ReactNode {
		const posts = this.props.data.posts.edges;
		const {
			homepage,
			profilePhoto,
			socialCard,
			socialCardJa,
		} = this.props.data;

		const featuredImage = getImage(profilePhoto);
		const socialCardUrl = getSrc(socialCard) || "";
		const socialCardJaUrl = getSrc(socialCardJa) || "";

		return (
			<Context.Consumer>
				{(context): React.ReactElement => (
					<>
						<Seo
							description={getTranslation(
								Translation.HomeDescription,
								context.locale
							)}
							image={{
								alt: getTranslation(Translation.SocialCardAlt, context.locale),
								url: "ja" === context.lang ? socialCardJaUrl : socialCardUrl,
							}}
							title={getTranslation(Translation.HomeTitle, context.locale)}
						/>

						<FeaturedWrapper>
							{featuredImage && (
								<FeaturedImageWrapper>
									<FeaturedImage
										alt={getTranslation(
											Translation.ProfilePhotoAlt,
											context.locale
										)}
										image={featuredImage}
										loading={"eager"}
									/>
								</FeaturedImageWrapper>
							)}

							<FeaturedContent>
								<RichText render={homepage.data?.title?.raw} />
								{homepage.data?.description?.text && (
									<p
										dangerouslySetInnerHTML={{
											__html: homepage.data.description.text,
										}}
									/>
								)}
							</FeaturedContent>
						</FeaturedWrapper>

						{posts.length && (
							<LatestPostsSection>
								<h2>
									{getTranslation(Translation.LatestPosts, context.locale)}
								</h2>
								<LatestPosts>
									{posts.map(
										({ node }): React.ReactElement => (
											<LatestPost key={node.id}>
												<PostPreview post={node} />
											</LatestPost>
										)
									)}
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
		posts: allPrismicPost(
			limit: 3
			filter: { lang: { eq: $locale } }
			sort: { order: DESC, fields: last_publication_date }
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
		profilePhoto: file(relativePath: { eq: "profile.jpeg" }) {
			childImageSharp {
				gatsbyImageData(placeholder: BLURRED, width: 700)
			}
		}
		socialCard: file(relativePath: { eq: "homepage-social-card.png" }) {
			childImageSharp {
				gatsbyImageData(height: 600, width: 1200)
			}
		}
		socialCardJa: file(relativePath: { eq: "homepage-social-card-ja.png" }) {
			childImageSharp {
				gatsbyImageData(height: 600, width: 1200)
			}
		}
	}
`;
