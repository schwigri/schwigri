import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { PageType, PrismicPost } from "../types/prismic.types";
import { formatDate, getLocale, getSlug } from "../utils/localization.util";
import { Context } from "./Context";
import { Link } from "./Link";
import React from "react";
import { RichText } from "prismic-reactjs";
import { Translation } from "../constants/translations.constants";
import { getTranslation } from "../utils/translation.util";
import styled from "styled-components";

const TagLink = styled(Link)`
	&::before {
		content: "#";
	}
`;

const Tag = styled("li")`
	display: inline;
	font-size: 0.9em;
	margin: 0 0.5em 0 0;
`;

const Tags = styled("ul")`
	list-style: none;
	margin: 0 1em 1em;
	padding: 0;
`;

const TitleLink = styled(Link)`
	color: inherit;
`;

const PostDate = styled("time")`
	display: flex;
	margin: 1.6rem 0;
	opacity: 0.75;
	font-size: 0.9em;
	padding: 0 1.6rem;
`;

const ThumbnailImage = styled(GatsbyImage)`
	border-radius: 0.5em 0.5em 0 0;
	z-index: 0;
`;

const ThumbnailLink = styled(Link)`
	border: 0;
	display: block;
	line-height: 0;
`;

const Wrapper = styled("article")`
	background-color: ${({ theme }): string => theme.colors.background};
	border-radius: 0.5em;
	box-shadow: ${({ theme }): string =>
		`0 0 1px ${theme.colors.separatorShadow}`};
	overflow: hidden;

	h1 {
		margin: 0 0 0.8rem;
		padding: 0 1.6rem;
	}

	p {
		padding: 0 1.6rem;
	}
`;

interface Props {
	className?: string;
	post: PrismicPost;
}

class PostPreview extends React.Component<Props> {
	render(): React.ReactNode {
		const { className, post } = this.props;
		const { data, tags } = post;
		const { excerpt, featuredImage, title } = data || {};
		const locale = getLocale(post.lang);
		const slug = getSlug(
			{
				date: post.firstPublicationDate,
				id: post.id || "",
				locale,
				type: PageType.Post,
				uid: post.uid || "",
			},
			locale
		);
		const updatedDate = new Date(post.lastPublicationDate || "");

		const postImage =
			featuredImage?.thumbnails?.mobileCard?.localFile &&
			getImage(featuredImage.thumbnails?.mobileCard?.localFile);

		return (
			<Context.Consumer>
				{context => (
					<Wrapper className={className}>
						<header>
							{postImage && (
								<ThumbnailLink to={slug}>
									<ThumbnailImage
										alt={featuredImage?.alt || ""}
										image={postImage}
									/>
								</ThumbnailLink>
							)}

							<PostDate dateTime={updatedDate.toISOString()}>
								{formatDate(updatedDate, locale)}
							</PostDate>

							<TitleLink to={slug}>
								<RichText render={title?.raw} />
							</TitleLink>
						</header>

						{tags && tags.length > 0 && (
							<Tags
								aria-label={getTranslation(Translation.Tags, locale)}
								role={"list"}
							>
								{tags
									.filter(tag => !!context.pageContext?.allTags?.[tag])
									.map((tag, i) => (
										<Tag key={`${tag}-${i}`}>
											<TagLink
												to={getSlug(
													{
														type: PageType.Tag,
														uid: context.pageContext?.allTags?.[tag].uid,
													},
													locale
												)}
											>
												{tag}
											</TagLink>
										</Tag>
									))}
							</Tags>
						)}

						{excerpt && <p>{excerpt}</p>}

						<p>
							<Link
								aria-label={getTranslation(
									Translation.ContinueReadingTitle,
									locale,
									{
										title:
											title?.text ||
											getTranslation(Translation.Untitled, locale),
									}
								)}
								to={slug}
							>
								{getTranslation(Translation.ContinueReading, locale)}
							</Link>
						</p>
					</Wrapper>
				)}
			</Context.Consumer>
		);
	}
}

export { PostPreview };
