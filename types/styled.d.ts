import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		breakpoints: {
			sm: number;
			md: number;
			lg: number;
			xl: number;
		};
		colors: {
			accent: string;
			background: string;
			copy: string;
			linkBorder: string;
			separatorShadow: string;
			subtitle: string;
			theme: string;
		};
		fonts: {
			code: string;
			copy: string;
			heading: string;
		};
		sizes: {
			content: string;
			copy: string;
		};
	}
}
