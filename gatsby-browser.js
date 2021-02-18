// Require fonts
require("@fontsource/work-sans");
require("@fontsource/work-sans/500.css");
require("@fontsource/prompt");
require("@fontsource/prompt/500.css");
require("@fontsource/m-plus-1p");
require("@fontsource/m-plus-1p/500.css");

// Setup store
export const wrapRootElement = require("./src/utils/layout.util")
	.wrapRootElement;

// Set common layout
export const wrapPageElement = require("./src/utils/layout.util")
	.wrapPageElement;
