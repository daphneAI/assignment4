# assignment4

This repository contains custom VS Code Copilot skills and a lightweight local Node.js server used to host them.

## Publish to npm

1. Make sure the package metadata is correct in `package.json`.
2. Log in to npm locally:
   `npm login`
3. Bump the version before publishing:
   `npm version patch`
4. Publish the package:
   `npm run publish:skills`

Optional dry run:
`npm run pack:check`

## Local preview

Start the local server:
`npm start`

Then open:
`http://localhost:3000`

## Included skills

- analysisAI
- analysisLinkX
- create-skill
