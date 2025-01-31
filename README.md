# Maintenance Mode

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt module, that allows you to put your site into maintenance mode.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/kristianbinau/nuxt-maintenance-mode?file=playground%2Fapp.vue)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->

- 📝 &nbsp;Customizable maintenance page, by handling the 503 status code
- 🏷️ &nbsp;Define pages to be included, with wildcard support
- 🔖 &nbsp;Define pages to be excluded, with wildcard support
- 🔑 &nbsp;Define a secret to bypass the maintenance mode
- 📦 &nbsp;Build-in Composables, enabling customizing page based on maintenance state.
- 🎨 &nbsp;RuntimeConfig support
- 🚀 &nbsp;Typescript ready!

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add @kristianbinau/nuxt-maintenance-mode
```

That's it! You can now use Maintenance Mode in your Nuxt app ✨

## Usage

Add the following configuration to your `nuxt.config.ts`:

<small><code>nuxt.config.ts</code></small>
```ts
  maintenanceMode: {
    enabled: true,
  }
```

## Options

### `enabled`

- Type: `boolean`
- Default: `false`

Enable or disable the maintenance mode.

### `bypassSecret`

- Type: `string | null`
- Default: `null`

Define a secret to bypass the maintenance mode.  
Navigate to `/?bypass={value}` to bypass the maintenance mode.	

### `include`

- Type: `string[] | null`
- Default: `null`

Define pages to be included in the maintenance mode. Supports wildcard `*`.

### `exclude`

- Type: `string[] | null`
- Default: `null`

Define pages to be excluded from the maintenance mode. Supports wildcard `*`.

<small>When both `exclude` and `include` are set, `include` will take precedence</small>

#### Setting options via runtimeConfig

You can also set the options via runtimeConfig:  
<small>RuntimeConfig will take precedence over the options set in `nuxt.config.ts`</small>

<small><code>nuxt.config.ts</code></small>
```ts
  runtimeConfig: {
		public: {
      maintenanceModeEnabled: process.env.NUXT_PUBLIC_MAINTENANCE_MODE_ENABLED,
		},
	},
```

#### Composables

The module provides a composable, that allows you to customize your page based on the maintenance state.

```ts
const url = useRequestURL();
const { isUnderMaintenance } = useMaintenance(url.pathname);
```

In the example above, `isUnderMaintenance` will be `true` if the current page is under maintenance.  
You can also pass a custom path to the `useMaintenance` composable.

```ts
const { isUnderMaintenance } = useMaintenance('/blog');
```

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@kristianbinau/nuxt-maintenance-mode/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@kristianbinau/nuxt-maintenance-mode
[npm-downloads-src]: https://img.shields.io/npm/dm/@kristianbinau/nuxt-maintenance-mode.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/@kristianbinau/nuxt-maintenance-mode
[license-src]: https://img.shields.io/npm/l/@kristianbinau/nuxt-maintenance-mode.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@kristianbinau/nuxt-maintenance-mode
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
