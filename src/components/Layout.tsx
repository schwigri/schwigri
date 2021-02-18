import { darkTheme, lightTheme } from "../utils/theme.util";
import styled, {
	DefaultTheme,
	ThemeProvider,
	createGlobalStyle,
} from "styled-components";
import { Header } from "./Header";
import { LangSwitcher } from "./LangSwitcher";
import React from "react";

const MainContent = styled("div")`
	margin: -1em 0;
`;

const MainWrapper = styled("main")`
	background-color: ${({ theme }): string => theme.colors.background};
	padding: 1em 0;
	position: relative;
	z-index: 2;

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p {
		margin-left: auto;
		margin-right: auto;
		max-width: ${({ theme }): string => `${theme.sizes.copy}px`};
		padding-left: 1.6rem;
		padding-right: 1.6rem;
	}

	pre {
		box-sizing: border-box;
		margin-left: auto;
		margin-right: auto;
		max-width: ${({ theme }): string => `${theme.sizes.copy}px`};
		width: calc(100% - 3.2rem);
	}
`;

const TopBarContent = styled("div")`
	font-size: 0.9em;
	margin: 0 auto;
	max-width: ${({ theme }): string => `${theme.sizes.content}px`};
	text-align: right;
`;

const TopBar = styled("aside")`
	background-color: ${({ theme }): string => theme.colors.background};
	color: ${({ theme }): string => theme.colors.copy};
	padding: 0.5em 1em;
	padding-left: max(1em, env(safe-area-inset-left));
	padding-right: max(1em, env(safe-area-inset-right));
	z-index: 4;

	@media (min-width: ${({ theme }): string => `${theme.breakpoints.md}px`}) {
		padding-left: max(2em, env(safe-area-inset-left));
		padding-right: max(2em, env(safe-area-inset-right));
	}
`;


const GlobalStyle = createGlobalStyle`
	html {
		font-size: 62.5%;
		text-size-adjust: 100%;
	}

	body {
		background-color: ${({ theme }): string => theme.colors.theme};
		color: ${({ theme }): string => theme.colors.copy};
		font-family: ${({ theme }): string => theme.fonts.copy};
		font-size: 1.6rem;
		margin: 0;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: ${({ theme }): string => theme.fonts.heading};
		font-weight: 700;
		line-height: 1;
		margin: 1em 0 0.5em;
	}

	p {
		line-height: 1.666;
		margin: 0 0 1em;
	}

	code {
		font-size: 1em;
	}

	pre {
		background-color: ${({ theme }): string => theme.colors.theme};
		border-radius: 0.5em;
		color: #fff;
		font-family: ${({ theme }): string => theme.fonts.code};
		font-size: 0.8em;
		font-weight: 500;
		line-height: 1.8;
		margin: 1em 0;
		padding: 1em;

		code {
			font-size: 1.25em;
		}
	}

	abbr[title] {
		cursor: help;
		position: relative;
		text-decoration: none;

		&::before {
			border-bottom: ${({ theme }): string => `1px dotted ${theme.colors.copy}`};
			bottom: 0;
			content: "";
			left: 0;
			position: absolute;
			width: 100%;
			@media (pointer: coarse) {
				display: none;
			}
		}

		&::after {
			content: " (" attr(title) ")";
			display: none;
			@media (pointer: coarse) {
				display: inline;
			}
		}
	}

	.upon-sm {
		@media (max-width: ${({ theme }): string => `${theme.breakpoints.sm - 1}px`}) {
			display: none;
		}
	}

	.until-sm {
		@media (min-width: ${({ theme }): string => `${theme.breakpoints.sm}px`}) {
			display: none;
		}
	}

	.upon-md {
		@media (max-width: ${({ theme }): string => `${theme.breakpoints.md - 1}px`}) {
			display: none;
		}
	}

	.until-md {
		@media (min-width: ${({ theme }): string => `${theme.breakpoints.md}px`}) {
			display: none;
		}
	}
`;

interface Props {
	children: React.ReactNode;
}

interface State {
	theme: DefaultTheme;
}

class Layout extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = { theme: darkTheme };
	}

	componentDidMount(): void {
		const lightModeQuery = window.matchMedia(
			"print, (prefers-color-scheme: light)"
		);

		const updateTheme = (): void =>
			this.setState({ theme: lightModeQuery.matches ? lightTheme : darkTheme });

		updateTheme();

		lightModeQuery.addEventListener("change", updateTheme);
	}

	render(): React.ReactNode {
		const { children } = this.props;
		const { theme } = this.state;

		return (
			<ThemeProvider theme={theme}>
				<GlobalStyle />

				<TopBar className={"upon-md"}>
					<TopBarContent>
						<LangSwitcher />
					</TopBarContent>
				</TopBar>

				<Header />

				<MainWrapper>
					<MainContent>{children}</MainContent>
				</MainWrapper>
			</ThemeProvider>
		);
	}
}

export { Layout };
