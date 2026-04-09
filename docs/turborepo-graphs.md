# Turborepo Graphs

## Workspace Dependency Graph

```mermaid
flowchart LR
    admin["admin"] --> ui["@workspace/ui"]
    admin --> eslintConfig["@workspace/eslint-config"]
    admin --> tsConfig["@workspace/typescript-config"]

    server["server"] --> api["@workspace/api"]
    server --> auth["@workspace/auth"]
    server --> env["@workspace/env"]
    server --> tsConfig

    web["web"] --> api
    web --> auth
    web --> env
    web --> ui
    web --> eslintConfig
    web --> tsConfig

    api --> auth
    api --> database["@workspace/database"]
    api --> tsConfig

    auth --> database
    auth --> env
    auth --> tsConfig

    database --> env
    database --> tsConfig

    env --> tsConfig

    ui --> eslintConfig
    ui --> tsConfig

    eslintConfig
    tsConfig
```

## Turbo Build Task Graph

This graph was generated from Turbo's `--graph` output for `turbo run build`.

```mermaid
flowchart LR
    apiBuild["@workspace/api#build"] --> authBuild["@workspace/auth#build"]
    apiBuild --> databaseBuild["@workspace/database#build"]
    apiBuild --> tsConfigBuild["@workspace/typescript-config#build"]

    authBuild --> databaseBuild
    authBuild --> envBuild["@workspace/env#build"]
    authBuild --> tsConfigBuild

    databaseBuild --> envBuild
    databaseBuild --> tsConfigBuild

    envBuild --> tsConfigBuild

    eslintBuild["@workspace/eslint-config#build"] --> root["root"]
    tsConfigBuild --> root

    uiBuild["@workspace/ui#build"] --> eslintBuild
    uiBuild --> tsConfigBuild

    adminBuild["admin#build"] --> eslintBuild
    adminBuild --> tsConfigBuild
    adminBuild --> uiBuild

    serverBuild["server#build"] --> apiBuild
    serverBuild --> authBuild
    serverBuild --> envBuild
    serverBuild --> tsConfigBuild

    webBuild["web#build"] --> apiBuild
    webBuild --> authBuild
    webBuild --> envBuild
    webBuild --> eslintBuild
    webBuild --> tsConfigBuild
    webBuild --> uiBuild
```

## Refresh Commands

```bash
pnpm turbo run build --graph=graph.dot --dry=json
```

The package dependency graph is based on `workspace:*` relationships declared in the workspace `package.json` files.
