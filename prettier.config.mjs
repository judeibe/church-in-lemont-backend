/** @type {import("prettier").Config} */
const config = {
  importOrder: [
    "@/instrumentation$",
    "^(@nestjs/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/env(.*)$",
    "^@/types/(.*)$",
    "^@/common/(.*)$",
    "^@/config/(.*)$",
    "^@/database/(.*)$",
    "^@/jobs/(.*)$",
    "^@/mails/(.*)$",
    "^@/models/(.*)$",
    "^@/providers/(.*)$",
    "",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  singleQuote: false,
  trailingComma: "all",
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
};

export default config;
