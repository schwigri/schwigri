import { Context } from "../components/Context";
import { PrismicPage } from "../.types/prismic.types";
import React from "react";
import { RichText } from "prismic-reactjs";
import { Seo } from "../components/Seo";
import { getSrc } from "gatsby-plugin-image";
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

						<Header>
							<RichText render={page.data?.title?.raw} />

							{page.data?.subtitle?.raw && (
								<Meta>
									<RichText render={page.data.subtitle.raw} />
								</Meta>
							)}
						</Header>

						<Content>
							<RichText render={page.data?.content?.raw} />
						</Content>
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
