module.exports = {
  verbose: true,
  collectCoverageFrom: [
    "config/**/*.{js,jsx,ts,tsx}",
    "src/**/*.{js,jsx,ts,tsx}",
    "src/api/**/controllers/*.{js,jsx,ts,tsx}",
    "src/api/**/routes/*.{js,jsx,ts,tsx}",
    "src/api/**/services/*.{js,jsx,ts,tsx}",
    "src/api/**/utils/*.{js,jsx,ts,tsx}"
  ],
  globals: {
    __PATH_PREFIX__: ``
  },
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  preset: "ts-jest",
  testPathIgnorePatterns: [
    "<rootDir>/__mocks__/*",
    "node_modules",
    "\\.tmp",
    "\\.cache",
    "<rootDir>.*/public",
    "<rootDir>/dist/*"
  ],
  transform: {
    "^.+\\.[tj]sx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json"
      }
    ]
  },
  roots: ["<rootDir>/tests/", "<rootDir>/config/", "<rootDir>/src/"],
  testEnvironment: "node",
  globalSetup: "<rootDir>/tests/setup.ts",
  globalTeardown: "<rootDir>/tests/teardown.ts"
}
