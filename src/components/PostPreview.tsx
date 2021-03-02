import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { formatDate, getLocale, getSlug } from "../utils/localization.util";
import { Link } from "./Link";
import { PrismicPost } from "../.types/prismic.types";
import React from "react";
import { RichText } from "prismic-reactjs";
import { getTranslation } from "../utils/translation.util";
import styled from "styled-components";

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
		const { excerpt, featuredImage, title } = post.data || {};
		const locale = getLocale(post.lang);
		const slug = getSlug(
			{
				date: post.firstPublicationDate,
				id: post.id || "",
				type: "post",
				uid: post.uid || "",
			},
			locale
		);
		const date = new Date(post.firstPublicationDate || "");

		const postImage =
			featuredImage?.thumbnails?.mobileCard?.localFile &&
			getImage(featuredImage.thumbnails?.mobileCard?.localFile);

		return (
			<Wrapper className={className}>
				<header>
					{postImage && (
						<ThumbnailLink to={slug}>
							<GatsbyImage alt={featuredImage?.alt || ""} image={postImage} />
						</ThumbnailLink>
					)}

					<PostDate dateTime={date.toISOString()}>
						{formatDate(date, locale)}
					</PostDate>

					<TitleLink to={slug}>
						<RichText render={title?.raw} />
					</TitleLink>
				</header>

				{excerpt && <p>{excerpt}</p>}

				<p>
					<Link
						aria-label={getTranslation("continue-reading-title", locale, {
							title: title?.text || getTranslation("untitled", locale),
						})}
						to={slug}
					>
						{getTranslation("continue-reading", locale)}
					</Link>
				</p>
			</Wrapper>
		);
	}
}

export { PostPreview };
