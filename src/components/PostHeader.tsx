import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { PageType, PrismicText } from "../types/prismic.types";
import { formatDate, getSlug } from "../utils/localization.util";
import { Link } from "./Link";
import React from "react";
import { RichText } from "prismic-reactjs";
import { SiteContext } from "../context/site.context";
import { Translation } from "../constants/translation.constants";
import { getTranslation } from "../utils/translation.util";
import styled from "styled-components";

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

const Subtitle = styled("div")`
	color: ${({ theme }): string => theme.colors.subtitle};
	font-family: ${({ theme }): string => theme.fonts.heading};
	font-size: 1.2em;
`;

const Header = styled("header")`
	margin: 4em auto;
	text-align: center;
`;

const Wrapper = styled("div")``;

interface Props {
	featuredImage?: {
		alt: string;
		image?: IGatsbyImageData;
	};
	publishedOn: Date;
	subtitle?: PrismicText;
	tags?: Array<string>;
	title: PrismicText;
	updatedOn: Date;
}

class PostHeader extends React.Component<Props> {
	render(): React.ReactNode {
		const {
			featuredImage,
			publishedOn,
			subtitle,
			tags,
			title,
			updatedOn,
		} = this.props;
		const sameDate =
			publishedOn.getFullYear() === updatedOn.getFullYear() &&
			publishedOn.getMonth() === updatedOn.getMonth() &&
			publishedOn.getDate() === updatedOn.getDate();

		return (
			<SiteContext.Consumer>
				{context => (
					<Wrapper>
						{featuredImage?.image && (
							<GatsbyImage
								alt={featuredImage.alt}
								image={featuredImage.image}
							/>
						)}

						<Header>
							<RichText render={title.raw} />

							{subtitle && <Subtitle />}

							<Meta>
								<p>
									{getTranslation(Translation.PublishedOn, context.locale, {
										date: formatDate(publishedOn, context.locale),
									})}
									{!sameDate && (
										<>
											<br />
											{getTranslation(Translation.UpdatedOn, context.locale, {
												date: formatDate(updatedOn, context.locale),
											})}
										</>
									)}
								</p>

								{tags && tags.length > 0 && (
									<Tags
										aria-label={getTranslation(
											Translation.Tags,
											context.locale
										)}
										role={"list"}
									>
										{tags
											.filter(tag => !!context.pageContext?.allTags?.[tag])
											.map(tag => (
												<Tag key={tag}>
													<TagLink
														to={getSlug({
															type: PageType.Tag,
															uid: context.pageContext?.allTags?.[tag].uid,
														})}
													>
														{tag}
													</TagLink>
												</Tag>
											))}
									</Tags>
								)}
							</Meta>
						</Header>
					</Wrapper>
				)}
			</SiteContext.Consumer>
		);
	}
}

export { PostHeader };
