import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import nextPlugin from "@next/eslint-plugin-next";
import styledJsxPlugin from "eslint-plugin-styled-jsx";
import typescriptEslint from "@typescript-eslint/parser";
import pluginTypescriptEslint from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: typescriptEslint,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@eslint/js": pluginJs,
      "@typescript-eslint": tseslint,
      react: pluginReact,
      "@next/next": nextPlugin,
      "styled-jsx": styledJsxPlugin,
      "@typescript-eslint": pluginTypescriptEslint,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...styledJsxPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "react/react-in-jsx-scope": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    ignores: [
      "node_modules/",
      ".next/",
      "out/",
      "build/",
      "dist/",
      "*.log",
      "*.md",
    ],
  },
];
