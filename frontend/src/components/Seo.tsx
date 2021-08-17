import { StaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { IGatsbyNodes } from "../types/gatsby.types";
import { IStrapiSite } from "../types/strapi.types";
import React from "react";
import { SiteContext } from "../context/site.context";
import { TranslationString } from "../constants/t9n.constants";
import { getTranslation } from "../utils/t9n.util";

interface ISeoProps extends ISeoGetterProps {
	data: {
		sites: IGatsbyNodes<IStrapiSite>;
	};
}

class Seo extends React.Component<ISeoProps> {
	render(): React.ReactNode {
		const { data, title } = this.props;

		return (
			<SiteContext.Consumer>
				{context => {
					const site = data.sites.nodes.find(
						search => search.locale === context.locale
					);

					return (
						<Helmet
							htmlAttributes={{ lang: context.locale }}
							title={
								title ||
								getTranslation(TranslationString.Untitled, context.locale)
							}
							titleTemplate={site?.seoTitleTemplate}
						/>
					);
				}}
			</SiteContext.Consumer>
		);
	}
}

interface ISeoGetterProps {
	title?: string;
}

function getSeo(props: ISeoGetterProps): React.ReactElement | null {
	const query = graphql`
		query SeoQuery {
			sites: allStrapiSite {
				nodes {
					locale
					seoTitleTemplate
				}
			}
		}
	`;

	return (
		<StaticQuery
			query={query}
			render={data => <Seo {...props} data={data} />}
		/>
	);
}

export { getSeo as Seo };
