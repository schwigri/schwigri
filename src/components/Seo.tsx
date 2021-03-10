import { StaticQuery, graphql } from "gatsby";
import { getLanguageCode, getSlug } from "../utils/localization.util";
import { Context } from "./Context";
import { Helmet } from "react-helmet";
import { Locale } from "../constants/localization.constants";
import React from "react";
import { getTranslation } from "../utils/translation.util";

interface BaseProps {
	description: string;
	image?: {
		alt: string;
		url: string;
	};
	title: string;
}

interface Props extends BaseProps {
	data: {
		site: {
			siteMetadata: {
				siteUrl: string;
			};
		};
	};
}

class Seo extends React.Component<Props> {
	render(): React.ReactNode {
		const { data, description, image, title } = this.props;
		const { siteUrl } = data.site.siteMetadata;

		return (
			<Context.Consumer>
				{(context): React.ReactElement => (
					<Helmet
						htmlAttributes={{ lang: context.lang }}
						meta={[
							{
								content: description,
								name: "description",
							},
							{
								content: title,
								property: "og:title",
							},
							{
								content: description,
								property: "og:description",
							},
							{
								content: "website",
								property: "og:type",
							},
							{
								content: title,
								name: "twitter:title",
							},
							{
								content: description,
								name: "twitter:description",
							},
						].concat(
							image
								? [
										{ content: `${siteUrl}${image.url}`, property: "og:image" },
										{ content: image.alt, property: "og:image:alt" },
										{ content: "summary_large_image", name: "twitter:card" },
								  ]
								: [{ content: "summary", name: "twitter:card" }]
						)}
						title={title}
						titleTemplate={getTranslation("title-template", context.locale)}
					>
						<link
							href={`${siteUrl}${getSlug(context.pageContext)}`}
							rel={"canonical"}
						/>

						{Object.values(Locale).map(locale => {
							const slug = getSlug(context.pageContext, locale);
							return (
								<link
									href={`${siteUrl}${slug}`}
									hrefLang={getLanguageCode(locale)}
									key={locale}
									rel={"alternate"}
								/>
							);
						})}
					</Helmet>
				)}
			</Context.Consumer>
		);
	}
}

function getSeo(props: BaseProps): React.ReactElement {
	const query = graphql`
		query SeoQuery {
			site {
				siteMetadata {
					siteUrl
				}
			}
		}
	`;

	return (
		<StaticQuery
			query={query}
			render={(data): React.ReactElement => <Seo data={data} {...props} />}
		/>
	);
}

export { getSeo as Seo };
