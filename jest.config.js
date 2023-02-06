// Please note I am learning unit testing, and this code was provided by tutorials:
	// https://www.pluralsight.com/guides/how-to-test-react-components-in-typescript
	// https://medium.com/tinyso/react-hero-typescript-jest-react-testing-library-setup-c2ecce18ec96

module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ["<rootDir>/src"],

  // Change to specific test environment
  "testEnvironment": "jsdom",

	testEnvironmentOptions: {
		url: 'https://jestjs.io'
	},

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};