import { PostContent } from "../components/PostContent";
import { PostHeader } from "../components/PostHeader";
import { PrismicPost } from "../types/prismic.types";
import React from "react";
import { Seo } from "../components/Seo";
import { SiteContext } from "../context/site.context";
import { Translation } from "../constants/translation.constants";
import { getImage } from "gatsby-plugin-image";
import { getSrc } from "gatsby-plugin-image";
import { getTranslation } from "../utils/translation.util";
import { graphql } from "gatsby";
// import styled from "styled-components";

// const Separator = styled("hr")`
// 	border-bottom-color: ${({ theme }): string => theme.colors.separatorShadow};
// 	border-top-width: 0;
// 	margin: 4em auto;
// 	width: 80%;
// `;

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

		const firstDate = new Date(post.firstPublicationDate || "");
		const lastDate = new Date(post.lastPublicationDate || "");

		return (
			<SiteContext.Consumer>
				{(context): React.ReactElement => (
					<article>
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

						{post.data?.title && (
							<PostHeader
								featuredImage={{
									alt: post.data.featuredImage?.alt || "",
									image: featuredImage,
								}}
								publishedOn={firstDate}
								tags={post.tags}
								title={post.data.title}
								updatedOn={lastDate}
							/>
						)}

						{/*<Separator />*/}

						<PostContent content={post.data?.body} />
					</article>
				)}
			</SiteContext.Consumer>
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
