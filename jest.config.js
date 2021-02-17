module.exports = {
	globals: {
		__PATH_PREFIX__: "",
	},
	moduleNameMapper: {
		".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
		".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/__mocks__/file-mock.js",
	},
	setupFiles: ["<rootDir>/src/utils/testing/loadershim.js"],
	setupFilesAfterEnv: ["<rootDir>/src/utils/testing/setup-test-env.js"],
	testPathIgnorePatterns: ["node_modules", "\\.cache", "<rootDir>.*/public"],
	transform: {
		"^.+\\.[jt]sx?$": "<rootDir>/src/utils/testing/jest-preprocess.js",
	},
	transformIgnorePatterns: ["node_modules/(?!(gatsby)/)"],
};
