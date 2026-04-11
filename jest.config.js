module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/__tests__/**/*.test.ts"],
  testTimeout: 30000,
  setupFiles: ["dotenv/config", "isomorphic-fetch"],
}
