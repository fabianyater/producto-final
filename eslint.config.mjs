import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint, { parser } from "typescript-eslint";


export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["node_modules/", "dist/"]
  },
  {
    languageOptions:
    {
      parser,
      ecmaVersion: 2021,
      sourceType: "module",
      globals: globals.browser,
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    }
  }
];