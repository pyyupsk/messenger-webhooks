import jsdoc from "eslint-plugin-jsdoc";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/build/**",
      "**/.turbo/**",
      "**/coverage/**",
      "apps/**",
      "packages/tests/**",
      "packages/typescript-config/**",
    ],
  },
  // TypeScript files in messenger-webhooks
  {
    files: ["packages/messenger-webhooks/src/**/*.ts"],
    extends: [
      ...tseslint.configs.recommended,
      jsdoc.configs["flat/recommended-typescript"],
    ],
    plugins: {
      jsdoc,
    },
    rules: {
      // Disable TypeScript rules we don't need (Biome handles these)
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",

      // === CONTENT RULES ===
      // Require JSDoc on exported functions and classes
      "jsdoc/require-jsdoc": [
        "warn",
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: false,
            FunctionExpression: false,
          },
          publicOnly: true,
          checkConstructors: true,
          checkGetters: true,
          checkSetters: true,
        },
      ],
      // Require description for JSDoc blocks
      "jsdoc/require-description": [
        "warn",
        {
          contexts: [
            "ClassDeclaration",
            "FunctionDeclaration",
            "MethodDefinition",
          ],
        },
      ],
      // Check that @param names match function parameters
      "jsdoc/check-param-names": "error",
      // Check tag names are valid
      "jsdoc/check-tag-names": [
        "error",
        {
          definedTags: ["see", "since", "throws", "template"],
        },
      ],
      // Don't require @param types in TypeScript (types come from TS)
      "jsdoc/require-param-type": "off",
      // Don't require @returns type in TypeScript
      "jsdoc/require-returns-type": "off",
      // Don't require @throws type
      "jsdoc/require-throws-type": "off",
      // Require @returns when function returns a value
      "jsdoc/require-returns": [
        "warn",
        {
          checkGetters: false,
          checkConstructors: false,
        },
      ],

      // === STYLE RULES ===
      // Enforce consistent alignment of JSDoc block asterisks
      "jsdoc/check-alignment": "warn",
      // Enforce line breaks between description and tags
      "jsdoc/tag-lines": [
        "warn",
        "never",
        {
          startLines: 1,
        },
      ],
      // Allow single-line blocks for short property docs (like @since)
      "jsdoc/multiline-blocks": [
        "warn",
        {
          noSingleLineBlocks: false,
        },
      ],
      // Enforce no multiple asterisks at start of lines
      "jsdoc/no-multi-asterisks": "warn",
      // Allow inline tags like @pyyupsk in comments
      "jsdoc/escape-inline-tags": "off",
      // Allow custom @since format like "v20.0"
      "jsdoc/check-values": "off",
    },
  },
);
