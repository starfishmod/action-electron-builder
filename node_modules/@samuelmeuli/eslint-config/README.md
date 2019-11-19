# eslint-config

These are my personal configurations for [ESLint](https://github.com/eslint/eslint). They are based on [Airbnb's ESLint configurations](https://github.com/airbnb/javascript).

## Overview

This repository contains ESLint configurations for the following setups:

- JavaScript
- JavaScript with React
- TypeScript
- TypeScript with React

They are designed to be used together with [Prettier](https://github.com/prettier/prettier).

## Usage

1. **Install the required packages:**

   - JavaScript:

     ```sh
     yarn add --dev @samuelmeuli/eslint-config \
       eslint-config-prettier \
       eslint-plugin-simple-import-sort \
       && npx install-peerdeps --dev eslint-config-airbnb-base
     ```

   - JavaScript with React:

     ```sh
     yarn add --dev @samuelmeuli/eslint-config \
       eslint-config-prettier \
       eslint-plugin-simple-import-sort \
       && npx install-peerdeps --dev eslint-config-airbnb
     ```

   - TypeScript:

     ```sh
     yarn add --dev @samuelmeuli/eslint-config \
       eslint-config-prettier \
       @typescript-eslint/eslint-plugin \
       @typescript-eslint/parser \
       eslint-plugin-simple-import-sort \
       && npx install-peerdeps --dev eslint-config-airbnb-base
     ```

   - TypeScript with React:

     ```sh
     yarn add --dev @samuelmeuli/eslint-config \
       eslint-config-prettier \
       @typescript-eslint/eslint-plugin \
       @typescript-eslint/parser \
       eslint-plugin-simple-import-sort \
       && npx install-peerdeps --dev eslint-config-airbnb
     ```

2. **Create the following entry in your `package.json` file:**

   - JavaScript:

     ```json
     {
       "eslintConfig": {
         "root": true,
         "extends": ["@samuelmeuli/eslint-config"]
       }
     }
     ```

   - JavaScript with React:

     ```json
     {
       "eslintConfig": {
         "root": true,
         "extends": ["@samuelmeuli/eslint-config/react"]
       }
     }
     ```

   - TypeScript:

     ```json
     {
       "eslintConfig": {
         "root": true,
         "extends": ["@samuelmeuli/eslint-config/typescript"]
       }
     }
     ```

   - TypeScript with React:

     ```json
     {
       "eslintConfig": {
         "root": true,
         "extends": ["@samuelmeuli/eslint-config/typescript-react"]
       }
     }
     ```

3. **Add a linting script to your `package.json` file:**

   - JavaScript:

     ```json
     {
       "scripts": {
         "lint": "eslint --fix --max-warnings 0 ."
       }
     }
     ```

   - JavaScript with React:

     ```json
     {
       "scripts": {
         "lint": "eslint --ext .js,.jsx --fix --max-warnings 0 ."
       }
     }
     ```

   - TypeScript:

     ```json
     {
       "scripts": {
         "lint": "eslint --ext .ts --fix --max-warnings 0 ."
       }
     }
     ```

   - TypeScript with React:

     ```json
     {
       "scripts": {
         "lint": "eslint --ext .ts,.tsx --fix --max-warnings 0 ."
       }
     }
     ```
