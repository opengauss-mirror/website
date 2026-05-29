# openGauss-website

Source code repository of the [openGauss community official website](https://opengauss.org/en/)

## Directory Structure

The website is built with `Vue 3` and `TypeScript` on top of the  `VitePress` framework. Most of its functions are rendered with static files, while only a few function modules (calendar, CVE, search, and filtering) require backend deployment.

```text
  app
    ├─ .vitepress
      ├─ public // Static resource file, not packaged or compiled
      ├─ src // Services
        ├─ api // APIs
        ├─ assets // Resource files
        ├─ components // Components
        ├─ i18 // Internationalization
        ├─ shared // Public methods/styles
        ├─ stores // Status management
        ├─ views // Service Vue files
    ├─ en // English page
    ├─ zh // Chinese page
```

## Contributions

1. Fork this repository.
2. Create a `Feat_xxx` branch.
3. Commit code.
4. Create a pull request (PR).

Note: Merge commit with `git rebase -i` to ensure there is only one commit for a PR. For detailed operations, see [Related Documents](https://zhuanlan.zhihu.com/p/429214913).

## Instructions

### Naming

#### Naming Pattern

1. `camelCase`
2. `kebab-case`
3. `PascalCase`
4. `Snake`

#### Description

1. Use `kebab-case` for all file and file folder names (except Vue SFC).
2. Use `PascalCase` for Vue SFC file names and Vue components used by the files.
3. Use `kebab-case` for `emit` events of the Vue components.
4. Use `camelCase` for variable and method names and `Snake` for resource files, with the style (light/dark) and language (zh/en/ru) specified in the style_language sequence (e.g. `homeBanner_light_zh`).
5. Use `kebab-case` for CSS names.
6. Add the `Icon` prefix for Icon components to be imported (e.g. `import IconDownload from '~icons/app/download'`).

### Development Specifications

1. Specify all API class methods in `app/.vitepress/src/api` and comment them according to the [JSDoc comment rules](https://www.shouce.ren/api/view/a/13232). Distinguish the APIs by file between modules (e.g. `api-cve.ts`).
2. Comment public utils methods according to [JSDoc comment rules](https://www.shouce.ren/api/view/a/13232).
3. Name variables with self-explanatory description and name methods with verbs or verb-object structures (e.g. `import warningImg from '@/assets/icons/warning.png`, `const getUserEmail=()=>{}`).
4. Use `try {} catch(error) {}` for verification when calling an API to obtain data.
5. Use `Object.keys().forEach` to replace `for...in` whenever possible.
6. Use the `prettier` plug-in as the formatting tool.
7. Before commits, run `pnpm lint` to perform an ESLint check. Do not commit until all errors are cleared. If `git commit` fails the checks configured in the project's git hooks, resolve the issues based on the error messages.
8. Follow [related specifications](https://zhuanlan.zhihu.com/p/182553920) whenever possible when using `git commit`.
9. For other specifications, consult prevailing [development specifications](https://github.com/airbnb/javascript) in the industry.


### Get Help

- IRC: #opengauss-infra
- Email: infra@opengauss.org
