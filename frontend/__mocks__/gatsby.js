const React = require("react");
const gatsby = jest.requireActual("gatsby");

module.exports = {
	...gatsby,
	Link: jest.fn().mockImplementation(
		({
			activeClassName,
			activeStyle,
			getProps,
			innerRef,
			partiallyActive,
			innerRef,
			replace,
			to,
			...rest
		}) => React.createElement("a", {
			...rest,
			href: to,
		})
	),
	StaticQuery: jest.fn(),
	graphql: jest.fn(),
	useStaticQuery: jest.fn(),
};
