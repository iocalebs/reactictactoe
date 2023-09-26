## How to use this template

1. Create repository from template

   ```
   gh repo create --clone --template castdin/quickstart-nextjs --private $projectName
   ```

2. Install dependencies

   ```
   bun install
   ```

## How to update this template

1.  Clone template repository

    ```
    git clone git@github.com:castdin/quickstart-nextjs.git
    ```

1.  Reset Git index

    ```
    git rm -rf .
    ```

    ```
    git clean -fxd
    ```

    ```
    git reset
    ```

1.  Re-create NextJS project

    ```
    bunx create-next-app . --typescript --eslint --tailwind --src-dir --app --use-bun
    ```

1.  Sort dependencies in `package.json`

    ```
    bunx sort-package-json
    ```

1.  Add Prettier dependencies

    ```
    bun add --save --dev prettier@latest eslint-config-prettier@latest prettier-plugin-tailwindcss@latest
    ```

1.  Create or update the following configuration files:

    - `.editorconfig`

      ```ini
      root = true

      [*]
      indent_style = tab
      insert_final_newline = true
      trim_trailing_whitespace = true

      ```

    - `.eslintrc.json`

      ```json
      {
      	"extends": ["next", "prettier"]
      }
      ```

    - `.prettierrc.json`

      ```json
      {
      	"plugins": ["prettier-plugin-tailwindcss"]
      }
      ```

1.  Run Prettier

    ```
    bun prettier --write .
    ```
