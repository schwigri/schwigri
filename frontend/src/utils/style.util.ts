import {
	GlobalBreakpoints,
	StyleBreakpoint,
} from "../constants/style.constants";
import { createGlobalStyle } from "styled-components";

export const getBreakpoint = (breakpoint: StyleBreakpoint): string =>
	`(min-width: ${GlobalBreakpoints[breakpoint]}px)`;

export const GlobalStyle = createGlobalStyle`
	:root {
		--default-primary-color: #ff5851;
		--primary-color: #ff5851;
		--color--background: #fff;
		--color--content-background: #f8f8f8;
		--font--copy: "Work Sans", "M PLUS 1p", sans-serif;
		--global--spacing: 2rem;
		--transition--standard-duration: 500ms;
		--transition--standard-timingFunction: cubic-bezier(0.7, 0, 0.3, 1);
		--transition--large-timingFunction: cubic-bezier(1, 0, 0, 1);

		@media ${getBreakpoint(StyleBreakpoint.Medium)} {
			--global--spacing: 4rem;
		}
	}

	html {
		font-size: 62.5%;
	}

	body {
		font-family: var(--font--copy);
		font-size: 1.6rem;
		height: 100%;
		margin: 0;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-weight: 800;
		line-height: 1;
		margin: 1em 0 0.5em;
	}

	p {
		line-height: 1.666;
		margin: 0 0 1em;
	}

	.loading {
		body {
			overflow: hidden;
			pointer-events: none;
		}
	}

	.menuOpen {
		body {
			overflow: hidden;
		}
	}

	.until-md {
		@media ${getBreakpoint(StyleBreakpoint.Medium)} {
			display: none !important;
		}
	}

	.upon-md {
		@media (max-width: ${GlobalBreakpoints[StyleBreakpoint.Medium] - 1}px) {
			display: none !important;
		}
	}
`;
