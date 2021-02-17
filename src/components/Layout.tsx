import { darkTheme, lightTheme } from "../utils/theme.util";
import styled, {
	DefaultTheme,
	ThemeProvider,
	createGlobalStyle,
} from "styled-components";
import React from "react";

const MainContent = styled("div")`
	margin: -1em 0;
`;

const MainWrapper = styled("main")`
	padding: 1em 0;
`;

const GlobalStyle = createGlobalStyle`
	html {
		font-size: 62.5%;
		text-size-adjust: 100%;
	}

	body {
		font-size: 1.6rem;
		margin: 0;
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

				<header>Header</header>

				<MainWrapper>
					<MainContent>{children}</MainContent>
				</MainWrapper>
			</ThemeProvider>
		);
	}
}

export { Layout };
