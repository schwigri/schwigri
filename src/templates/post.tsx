import { Context } from "../components/Context";
import { PrismicPost } from "../.types/prismic.types";
import React from "react";
import { Seo } from "../components/Seo";
import { getSrc } from "gatsby-plugin-image";
import { getTranslation } from "../utils/translation.util";
import { graphql } from "gatsby";

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

						<p>Post</p>
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
				seoDescription: seo_description
				seoTitle: seo_title
			}
		}
	}
`;
