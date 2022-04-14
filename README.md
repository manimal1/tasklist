# A simple React TypeScript tasklist app

## System requirements

- It mayb be required to globally install [JSON Server](https://github.com/typicode/json-server) in order to run this application successfully. **JSON Server** was used to create and run a functioning, mocked backend. You can install it with this command:

```
npm install -g json-server
```

- [Vite](https://vitejs.dev/) requires [Node.js](https://nodejs.org/en/) version >=12.2.0
- It is also recommended **(but not required)** that you have the React dev tools browser extension installed and enabled

## Quickstart guide

As mentioned above, you may first have to run `npm install -g json-server`.

```
yarn install
yarn dev
```

## Scripts

- `yarn install`

Install all local dependencies

- `yarn dev`

Start dev server. This runs both `db:serve` and `fe:serve` concurrently so you don't have to run them separately.

- `yarn db:serve`

Start JSON server

- `yarn fe:serve`

Start the frontend application

- `yarn build`

Build for production

- `yarn preview`

Locally preview production build

- `yarn lint`

Run linter across the code base

- `yarn test`

Run tests

## Linting and code standards

A very simple setup using [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/) has been employed in this starter project. It was kept basic on purpose, to allow for easy configuration based on user preferences. It will still catch all the **recommended** lint errors for standard React TypeScript apps.
