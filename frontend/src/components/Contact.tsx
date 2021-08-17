import { StaticQuery, graphql } from "gatsby";
import { IGatsbyNodes } from "../types/gatsby.types";
import { IStrapiSite } from "../types/strapi.types";
import React from "react";
import { SiteContext } from "../context/site.context";
import styled from "styled-components";

const ContactLink = styled("a")`
	color: inherit;
	font-size: 1.3rem;
	font-weight: 600;
	text-decoration: none;
`;

const Address = styled("address")`
	display: inline-block;
	font-size: 1.1rem;
	font-style: normal;
	font-weight: 400;
`;

const Wrapper = styled("div")`
	align-self: flex-end;
	margin: auto 0 4rem;
	width: 100%;
`;

interface IContactProps {
	data: {
		sites?: IGatsbyNodes<IStrapiSite>;
	};
}

class Contact extends React.Component<IContactProps> {
	render(): React.ReactNode {
		const { data } = this.props;

		return (
			<SiteContext.Consumer>
				{context => {
					const site = data.sites?.nodes.find(
						search => search.locale === context.locale
					);

					if (!site) return null;

					return (
						<Wrapper>
							{site.location && (
								<>
									<Address>{site.location}</Address>
									<br />
								</>
							)}
							{site.contactPhone && (
								<>
									<ContactLink href={`tel:${site.contactPhone}`}>
										{site.contactPhone}
									</ContactLink>
									<br />
								</>
							)}
							{site.contactEmail && (
								<ContactLink href={`mailto:${site.contactEmail}`}>
									{site.contactEmail}
								</ContactLink>
							)}
						</Wrapper>
					);
				}}
			</SiteContext.Consumer>
		);
	}
}

function getContact(): React.ReactElement | null {
	const query = graphql`
		query ContactQuery {
			sites: allStrapiSite {
				nodes {
					contactEmail
					contactPhone
					locale
					location
				}
			}
		}
	`;

	return <StaticQuery query={query} render={data => <Contact data={data} />} />;
}

export { getContact as Contact };
