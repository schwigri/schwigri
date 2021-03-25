import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { PageType, PrismicPost } from "../types/prismic.types";
import { formatDate, getSlug } from "../utils/localization.util";
import { Context } from "../components/Context";
import { Link } from "../components/Link";
import React from "react";
import { RichText } from "prismic-reactjs";
import { Seo } from "../components/Seo";
import { Translation } from "../constants/translations.constants";
import { getSrc } from "gatsby-plugin-image";
import { getTranslation } from "../utils/translation.util";
import { graphql } from "gatsby";
import styled from "styled-components";

const Separator = styled("hr")`
	border-bottom-color: ${({ theme }): string => theme.colors.separatorShadow};
	border-top-width: 0;
	margin: 4em auto;
	width: 80%;
`;

const TagLink = styled(Link)`
	&::before {
		content: "#";
	}
`;

const Tag = styled("li")`
	display: inline-block;
	margin-right: 0.5em;
`;

const Tags = styled("ul")`
	list-style: none;
	padding: 0 1.6rem;

	@media (min-width: ${({ theme }): string => `${theme.breakpoints.md}px`}) {
		padding: 0 3.2rem;
	}
`;

const Meta = styled("div")`
	color: ${({ theme }): string => theme.colors.subtitle};
	font-size: 0.9em;
	margin: 0 auto 1em;
	text-align: left;
`;

const Content = styled("div")`
	margin: 4em auto;
`;

const Subtitle = styled("div")`
	color: ${({ theme }): string => theme.colors.subtitle};
	font-family: ${({ theme }): string => theme.fonts.heading};
	font-size: 1.2em;
`;

const Header = styled("div")`
	margin: 4em 0;
	text-align: center;
`;

interface Props {
	data: {
		post: PrismicPost;
	};
}

class PostTemplate extends React.Component<Props> {
	render(): React.ReactNode {
		const { post } = this.props.data;

		const socialCardUrl = post.data?.socialCard?.thumbnails?.og?.localFile
			? getSrc(post.data.socialCard.thumbnails.og.localFile)
			: undefined;

		const featuredImage =
			post.data?.featuredImage?.thumbnails?.desktopHeader?.localFile &&
			getImage(post.data.featuredImage.thumbnails.desktopHeader.localFile);

		const hasTags = post.tags ? post.tags.length > 0 : false;

		const firstDate = new Date(post.firstPublicationDate || "");
		const lastDate = new Date(post.lastPublicationDate || "");
		const sameDate =
			firstDate.getFullYear() === lastDate.getFullYear() &&
			firstDate.getMonth() === lastDate.getMonth() &&
			firstDate.getDate() === lastDate.getDate();

		return (
			<Context.Consumer>
				{(context): React.ReactElement => (
					<>
						<Seo
							description={post.data?.seoDescription || ""}
							image={
								socialCardUrl
									? {
											alt:
												post.data?.socialCard?.thumbnails?.og?.alt ||
												post.data?.socialCard?.alt ||
												"",
											url: socialCardUrl,
									  }
									: undefined
							}
							title={
								post.data?.seoTitle ||
								post.data?.title?.text ||
								getTranslation(Translation.Untitled, context.locale)
							}
						/>

						{featuredImage && (
							<GatsbyImage
								alt={post?.data?.featuredImage?.alt || ""}
								image={featuredImage}
							/>
						)}

						<Header>
							<RichText render={post.data?.title?.raw} />

							{post.data?.subtitle?.raw && (
								<Subtitle>
									<RichText render={post.data.subtitle.raw} />
								</Subtitle>
							)}

							<Meta>
								<p>
									{getTranslation(Translation.PublishedOn, context.locale, {
										date: formatDate(firstDate, context.locale),
									})}
									{!sameDate && (
										<>
											<br />
											{getTranslation(Translation.UpdatedOn, context.locale, {
												date: formatDate(lastDate, context.locale),
											})}
										</>
									)}
								</p>

								{hasTags && (
									<Tags
										aria-label={getTranslation(
											Translation.Tags,
											context.locale
										)}
										role={"list"}
									>
										{post.tags
											?.filter(tag => !!context.pageContext?.allTags?.[tag])
											.map(tag => (
												<Tag key={tag}>
													<TagLink
														to={getSlug(
															{
																type: PageType.Tag,
																uid: context.pageContext?.allTags?.[tag].uid,
															},
															context.locale
														)}
													>
														{tag}
													</TagLink>
												</Tag>
											))}
									</Tags>
								)}
							</Meta>
						</Header>

						<Content>
							<Separator />

							{post.data?.body?.map(block => (
								<section key={block.id}>
									{"PrismicPostBodyRichText" === block.internal.type && (
										<RichText render={block.primary?.content?.raw} />
									)}
								</section>
							))}
						</Content>
					</>
				)}
			</Context.Consumer>
		);
	}
}

export default PostTemplate;

export const query = graphql`
	query PostTemplateQuery($id: String!) {
		post: prismicPost(id: { eq: $id }) {
			data {
				body {
					... on PrismicPostBodyCodeBlock {
						id
						internal {
							type
						}
						primary {
							content {
								raw
							}
						}
					}
					... on PrismicPostBodyRichText {
						id
						internal {
							type
						}
						primary {
							content {
								raw
							}
						}
					}
				}
				featuredImage: featured_image {
					alt
					thumbnails {
						desktopHeader: desktop_header {
							localFile {
								childImageSharp {
									gatsbyImageData(layout: FULL_WIDTH)
								}
							}
						}
					}
				}
				seoDescription: seo_description
				seoTitle: seo_title
				subtitle {
					raw
				}
				title {
					raw
					text
				}
			}
			firstPublicationDate: first_publication_date
			lastPublicationDate: last_publication_date
			tags
		}
	}
`;
