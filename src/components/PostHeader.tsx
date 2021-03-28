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
	text-align: center;

	p,
	ul {
		margin: 0 auto 0.5em;
	}
`;

const Subtitle = styled("div")`
	color: ${({ theme }): string => theme.colors.subtitle};
	font-family: ${({ theme }): string => theme.fonts.heading};
	font-size: 1.2em;
`;

const TitleLink = styled(Link)`
	border-bottom-width: 0;
	color: inherit;
`;

const PreviewImage = styled(GatsbyImage)`
	border-radius: 0.5em;
	box-shadow: ${({ theme }): string =>
		`0 0 1px ${theme.colors.separatorShadow}`};
`;

const ImageLink = styled(Link)`
	border-bottom-width: 0;
	display: flex;
	justify-content: center;

	&:focus,
	&:hover {
		background-color: transparent;
	}
`;

const Header = styled("header")<PreviewProps>`
	margin: ${({ $isPreview }): string => `${$isPreview ? "2em" : "4em"} auto`};
	text-align: center;

	h1 {
		font-size: ${({ $isPreview }): string => ($isPreview ? "1.6em" : "3em")};
	}
`;

const Wrapper = styled("div")<PreviewProps>`
	&:not(:last-child) {
		margin-bottom: ${({ $isPreview }): string => ($isPreview ? "4em" : "0")};
		padding-bottom: ${({ $isPreview }): string => ($isPreview ? "4em" : "0")};
		position: relative;

		&::after {
			background-color: ${({ theme }): string => theme.colors.separatorShadow};
			bottom: 0;
			content: "";
			display: ${({ $isPreview }): string => ($isPreview ? "block" : "none")};
			height: 1px;
			left: 50%;
			max-width: 560px;
			opacity: 0.5;
			position: absolute;
			transform: translateX(-50%);
			width: 80%;
		}
	}
`;

interface PreviewProps {
	$isPreview: boolean;
}

interface Props {
	featuredImage?: {
		alt: string;
		image?: IGatsbyImageData;
	};
	preview?: {
		excerpt: string;
		permalink: string;
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
			preview,
			// publishedOn,
			subtitle,
			tags,
			title,
			updatedOn,
		} = this.props;

		// const sameDate =
		// 	publishedOn.getFullYear() === updatedOn.getFullYear() &&
		// 	publishedOn.getMonth() === updatedOn.getMonth() &&
		// 	publishedOn.getDate() === updatedOn.getDate();

		return (
			<SiteContext.Consumer>
				{context => (
					<Wrapper $isPreview={!!preview?.permalink}>
						{featuredImage?.image &&
							(preview?.permalink ? (
								<ImageLink to={preview.permalink}>
									<PreviewImage
										alt={featuredImage.alt}
										image={featuredImage.image}
									/>
								</ImageLink>
							) : (
								<GatsbyImage
									alt={featuredImage.alt}
									image={featuredImage.image}
								/>
							))}

						<Header $isPreview={!!preview?.permalink}>
							{preview?.permalink ? (
								<TitleLink to={preview.permalink}>
									<RichText render={title.raw} />
								</TitleLink>
							) : (
								<RichText render={title.raw} />
							)}

							{subtitle && <Subtitle />}

							<Meta>
								<p>{formatDate(updatedOn, context.locale)}</p>

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

						{preview?.excerpt && <p>{preview.excerpt}</p>}

						{preview?.permalink && (
							<p>
								<Link
									aria-label={getTranslation(
										Translation.ContinueReadingTitle,
										context.locale,
										{
											title:
												title.text ||
												getTranslation(Translation.Untitled, context.locale),
										}
									)}
									to={preview.permalink}
								>
									{getTranslation(Translation.ContinueReading, context.locale)}
								</Link>
							</p>
						)}
					</Wrapper>
				)}
			</SiteContext.Consumer>
		);
	}
}

export { PostHeader };
