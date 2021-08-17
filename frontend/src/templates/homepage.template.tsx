import { IStrapiHomepage } from "../types/strapi.types";
import React from "react";
import { Seo } from "../components/Seo";
import { graphql } from "gatsby";

interface IHomepageTemplateProps {
	data: {
		homepage?: IStrapiHomepage;
	};
}

class HomepageTemplate extends React.Component<IHomepageTemplateProps> {
	render(): React.ReactNode {
		const { data } = this.props;

		return (
			<>
				<Seo title={data.homepage?.seoTitle || data.homepage?.title} />

				<div style={{ height: "100vh" }} />
			</>
		);
	}
}

export default HomepageTemplate;

export const query = graphql`
	query HomepageTemplateQuery($id: String!) {
		homepage: strapiHomepage(id: { eq: $id }) {
			primaryColor
			seoTitle
			title
		}
	}
`;
