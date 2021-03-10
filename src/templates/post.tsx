import { Context } from "../components/Context";
import { PrismicPost } from "../types/prismic.types";
import React from "react";
import { RichText } from "prismic-reactjs";
import { Seo } from "../components/Seo";
import { getSrc } from "gatsby-plugin-image";
import { getTranslation } from "../utils/translation.util";
import { graphql } from "gatsby";
import styled from "styled-components";

const Content = styled("div")`
	margin: 4em auto;
	max-width: ${({ theme }): string => theme.sizes.copy};
`;

const Meta = styled("div")`
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
								getTranslation("untitled", context.locale)
							}
						/>

						<Header>
							<RichText render={post.data?.title?.raw} />

							{post.data?.subtitle?.raw && (
								<Meta>
									<RichText render={post.data.subtitle.raw} />
								</Meta>
							)}
						</Header>

						<Content>
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
				seoDescription: seo_description
				seoTitle: seo_title
				subtitle {
					raw
				}
				title {
					raw
				}
			}
		}
	}
`;
