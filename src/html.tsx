import React from "react";

interface Props {
	body: string;
	bodyAttributes: object;
	headComponents: React.ReactNode;
	htmlAttributes: object;
	postBodyComponents: React.ReactNode;
	preBodyComponents: React.ReactNode;
}

function HTML(props: Props): React.ReactElement {
	return (
		// Lang will be set by each page
		// eslint-disable-next-line jsx-a11y/html-has-lang
		<html {...props.htmlAttributes}>
			<head>
				<meta charSet={"utf-8"} />
				<meta content={"ie=edge"} httpEquiv={"x-ua-compatible"} />
				<meta
					content={
						"viewport-fit=cover, width=device-width, initial-scale=1, shrink-to-fit=no"
					}
					name={"viewport"}
				/>
				{props.headComponents}
			</head>
			<body {...props.bodyAttributes}>
				{props.preBodyComponents}
				<div
					key={"body"}
					id={"___gatsby"}
					dangerouslySetInnerHTML={{ __html: props.body || "" }}
				/>
				{props.postBodyComponents}
			</body>
		</html>
	);
}

export default HTML;
