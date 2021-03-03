import { Context } from "../components/Context";
import { PrismicPage } from "../.types/prismic.types";
import React from "react";
import { Seo } from "../components/Seo";
import { getSrc } from "gatsby-plugin-image";
import { graphql } from "gatsby";

interface Props {
	data: {
		page: PrismicPage;
	};
}

class PageTemplate extends React.Component<Props> {
	render(): React.ReactNode {
		const { page } = this.props.data;

		const socialCardUrl = page.data?.socialCard?.thumbnails?.og?.localFile
			? getSrc(page.data.socialCard.thumbnails.og.localFile)
			: undefined;

		return (
			<Context.Consumer>
				{(context): React.ReactElement => (
					<>
						<Seo
							description={page.data?.seoDescription || ""}
							image={
								socialCardUrl
									? {
											alt:
												page.data?.socialCard?.thumbnails?.og?.alt ||
												page.data?.socialCard?.alt ||
												"",
											url: socialCardUrl,
									  }
									: undefined
							}
							title={page.data?.seoTitle || ""}
						/>

						<p>Page</p>
					</>
				)}
			</Context.Consumer>
		);
	}
}

export default PageTemplate;

export const query = graphql`
	query PageTemplateQuery($id: String!) {
		page: prismicPage(id: { eq: $id }) {
			data {
				seoDescription: seo_description
				seoTitle: seo_title
			}
		}
	}
`;
