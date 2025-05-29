# A simple todo app to learn Cloudflare and AI integration

## Requirements
 - [Node js](https://nodejs.org/en/download)
 - [A cloudflare account](https://www.cloudflare.com/)
 - [Pnpm](https://pnpm.io/installation)

## Local Set up
- Clone the repo
  ```bash
  git clone https://github.com/uwemneku/vite-cloudflare
  ```
- install dependencies
  ```bash
    pnpm i
  ```
- Login into wrangler
  ```bash
    pnpm wrangler login
  ```
- Create a D1 database
  ```bash
    pnpx wrangler@latest d1 create todoaPP
  ```

- Apply migrations to local D1 database
  <br>
  Replace `file-path` with the sql file found at `drizzle/migrations/********/sql`
  ```bash
    pnpm db:migrate:local
  ```
- Start the app
  ```bash
    pnpm dev
  ```

  ## Github Action
  For the github action to work, you need to create the following secretes in your repo
  - CLOUDFLARE_API_TOKEN
  - CLOUDFLARE_ACCOUNT_ID
  <br />
  [Cloudlfare docs](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/#api-token)

  **The github action automatically applies db migrations to the production db. Not so sure this is a good idea.

