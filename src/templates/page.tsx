import { PageContent } from "../components/PageContent";
import { PageHeader } from "../components/PageHeader";
import { PrismicPage } from "../types/prismic.types";
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

				{page.data?.title && (
					<PageHeader subtitle={page.data.subtitle} title={page.data.title} />
				)}

				<PageContent content={page.data?.content} />
			</>
		);
	}
}

export default PageTemplate;

export const query = graphql`
	query PageTemplateQuery($id: String!) {
		page: prismicPage(id: { eq: $id }) {
			data {
				content {
					raw
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
