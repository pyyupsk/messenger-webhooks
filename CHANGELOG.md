# @pyyupsk/messenger-webhooks

## 1.3.0

### Minor Changes

- **API Version Upgrade**: Default API version upgraded from v19.0 to v24.0
  - Added comprehensive API version constants and types
  - Backward compatible across API v19.0 - v24.0
- **Build Tool Migration**: Migrated from tsup to tsdown v0.16.6
  - Improved build performance and type generation
  - Updated package exports with proper CJS/ESM type declarations
- **Enhanced Type Definitions**:
  - Added comprehensive JSDoc documentation across all types
  - Added new webhook event types:
    - `MessageReactionEvent` (v20+) for emoji reactions
    - `MessageReadEvent` for read receipts
    - `MessageDeliveryEvent` for delivery confirmations
  - Enhanced existing event types with missing fields:
    - Added `metadata`, `is_deleted`, `reply_to` to MessageEvent
    - Added `ads_context_data` to PostbackEvent and ReferralsEvent
    - Added `is_guest_user` to WebhookEvent sender
  - Improved type accuracy (e.g., `is_echo` now required for EchoesEvent)
  - Added version-specific documentation with @since annotations
- **Package Manager Migration**: Migrated from pnpm to bun
  - Faster dependency installation and script execution
  - Updated CI/CD workflows to use bun
- **Documentation Improvements**:
  - Upgraded fumadocs to v16 with restructured documentation app
  - Added package manager tabs with remarkNpm plugin
  - Added file tree visualization with remarkMdxFiles plugin
  - Added page actions and root page redirect
- **Code Quality Improvements**:
  - Migrated from ESLint/Prettier to Biome for linting and formatting
  - Added eslint-plugin-jsdoc for JSDoc validation
  - Added typecheck script for better type safety
  - Migrated from Husky to Lefthook for git hooks
  - Moved test files to `__tests__` directory
  - Improved code formatting consistency
  - Enhanced messaging classes with compatibility notes

## 1.2.0

### Minor Changes

- **Dependency Updates**: Updated to latest versions for improved stability
  - Express: ^4.19.2 → ^5.1.0
  - @types/express: ^4.17.21 → ^5.0.2
  - tsup: ^8.2.4 → ^8.5.0
  - TypeScript: ^5.5.4 → ^5.8.3
- **Type Inference Improvements**: Enhanced method return types to use `this` for
  better chainability and type inference

## 1.1.3

### Patch Changes

- **Event Support**: Added support for echo events
  - Enables tracking of bot's own messages echoed back

## 1.1.2

### Patch Changes

- **Project Restructuring**: Major refactoring for better maintainability
  - Moved tests to separate package
  - Updated dependencies and configurations
  - Improved project organization

## 1.1.1

### Patch Changes

- **Module Resolution**: Updated package.json exports field
  - Improved ESM/CJS module resolution
  - Better compatibility with modern bundlers

## 1.1.0

### Minor Changes

- **Referral Events**: Added support for referral event type
  - Track users coming from m.me links and ads
  - Improved event type detection and handling

## 1.0.0

### Major Changes

- **Initial Release**: First stable release of @pyyupsk/messenger-webhooks
  - Facebook Messenger webhook integration
  - Event handling system
  - Message sending capabilities
  - Template and button support
