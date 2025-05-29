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
- Create the database schema migration
  ```bash
    pnpm run db:generate
  ```
- Apply migrations to local D1 database
  <br>
  Replace `file-path` with the sql file found at `drizzle/migrations/********/sql`
  ```bash
    pnpm execute:D1:db "file-path"
  ```
- Start the app
  ```bash
    pnpm dev
  ```

