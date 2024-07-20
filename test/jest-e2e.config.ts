import { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  moduleNameMapper: {
    "^@/(.*)": "../src/$1",
  },
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
};

export default jestConfig;
