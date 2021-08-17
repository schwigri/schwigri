module.exports = {
	globals: {
		__PATH_PREFIX__: "",
	},
	moduleNameMapper: {
		".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
		".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/__mocks__/file-mock.js",
	},
	setupFiles: ["<rootDir>/src/testing/loadershim.js"],
	setupFilesAfterEnv: ["<rootDir>/src/testing/setup-test-env.js"],
	testEnvironment: "jsdom",
	testPathIgnorePatterns: ["node_modules", "\\.cache", "<rootDir>/public"],
	testURL: "http://localhost",
	transform: {
		"^.+\\.[jt]sx?$": "<rootDir>/src/testing/jest-preprocess.js",
	},
	transformIgnorePatterns: ["node_modules/(?!(gatsby)/)"],
};
