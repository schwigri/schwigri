import { IStrapiPage } from "../types/strapi.types";
import React from "react";
import { Seo } from "../components/Seo";
import { StyleBreakpoint } from "../constants/style.constants";
import { getBreakpoint } from "../utils/style.util";
import { graphql } from "gatsby";
import styled from "styled-components";

const Title = styled("h1")`
	font-size: 3.6em;
	line-height: 1;
	margin: 0;
	position: relative;
	text-transform: uppercase;
	width: 100%;
	z-index: 2;

	&::before {
		background-color: black;
		content: "";
		display: block;
		height: 4px;
		left: 2px;
		position: absolute;
		top: -0.5em;
		width: 15%;
	}

	@media ${getBreakpoint(StyleBreakpoint.Medium)} {
		font-size: 8em;
		position: absolute;
		top: 50vh;
		transform: translateY(-50%);
		width: 70vw;
	}
`;

interface IIntroProps {
	$primaryColor?: string;
}

const Intro = styled("div")<IIntroProps>`
	background-color: var(--primary-color);
	min-height: 70vh;
	overflow: auto;
	padding: 30vh 4rem 0;
	position: relative;

	&::before {
		background-color: var(--color--content-background);
		content: "";
		display: block;
		height: 45vh;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 1;
	}

	@media ${getBreakpoint(StyleBreakpoint.Medium)} {
		min-height: 40vh;
		padding: 60vh 15vw 0;
	}
`;

interface IPageTemplateProps {
	data: {
		page?: IStrapiPage;
	};
}

class PageTemplate extends React.Component<IPageTemplateProps> {
	render(): React.ReactNode {
		const { data } = this.props;

		return (
			<>
				<Seo title={data.page?.title} />

				<Intro $primaryColor={data.page?.primaryColor}>
					<Title>{data.page?.title || "Untitled"}.</Title>
				</Intro>
			</>
		);
	}
}

export default PageTemplate;

export const query = graphql`
	query PageTemplateQuery($id: String!) {
		page: strapiPage(id: { eq: $id }) {
			title
		}
	}
`;
