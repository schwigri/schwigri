// Require fonts
require("@fontsource/work-sans/latin-ext-400.css");
require("@fontsource/work-sans/latin-ext-500.css");
require("@fontsource/prompt/latin-ext-400.css");
require("@fontsource/prompt/latin-ext-500.css");
require("@fontsource/m-plus-1p/japanese-400.css");
require("@fontsource/m-plus-1p/japanese-500.css");

// Setup store
export const wrapRootElement = require("./src/utils/layout.util")
	.wrapRootElement;

// Set common layout
export const wrapPageElement = require("./src/utils/layout.util")
	.wrapPageElement;
