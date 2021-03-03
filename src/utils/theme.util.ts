import { DefaultTheme } from "styled-components";

const baseTheme = {
	breakpoints: {
		sm: 544,
		md: 768,
		lg: 1012,
		xl: 1280,
	},
	fonts: {
		code: '"JetBrans Mono", monospace',
		copy: '"Work Sans", "M PLUS 1p", sans-serif',
		heading: 'Prompt, "M PLUS 1p", sans-serif',
	},
	sizes: {
		content: "1220px",
		copy: "700px",
	},
};

export const darkTheme: DefaultTheme = {
	...baseTheme,
	colors: {
		accent: "#fffae6",
		background: "#111",
		copy: "#fff",
		linkBorder: "rgba(255, 248, 219, 0.15)",
		separatorShadow: "rgba(255, 255, 255, 0.5)",
		subtitle: "#ccc",
		theme: "#1467ff",
	},
};

export const lightTheme: DefaultTheme = {
	...baseTheme,
	colors: {
		accent: "#125be1",
		background: "#fff",
		copy: "#333",
		linkBorder: "rgba(20, 103, 255, 0.15)",
		separatorShadow: "rgba(0, 0, 0, 0.25)",
		subtitle: "#666",
		theme: "#fff8db",
	},
};
