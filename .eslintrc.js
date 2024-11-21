/* eslint-disable security/detect-unsafe-regex */
module.exports = {
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:security/recommended'
  ],
  plugins: [
    'simple-import-sort',
    'filename-rules',
    '@typescript-eslint',
    'folders',
    'unicorn'
  ],
  settings: {
    //
  },
  globals: {
    G: 'readonly',
    JSX: 'readonly',
    Form: 'readonly',
    GQL_gen: 'readonly',
    GQLEnums: 'readonly'
  },
  rules: {
    '@next/next/no-img-element': 'off',
    'filename-rules/match': [
      2,
      {
        '.ts': /^([\d+_a-z-])*[\da-z]+(?:\..*)?$/,
        '.tsx': /^([\d+_a-z-])*[\da-z]+(?:\..*)?$/
      }
    ],
    // 'folders/match-regex': [2, null, '/src/']
    camelcase: 'off',
    'func-names': 'off',
    'global-require': 'off',
    'consistent-return': 'off',
    'comma-dangle': ['error', 'never'],
    'max-len': ['error', { code: 140 }],
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '_store',
          '_apolloClient',
          '_app',
          '_error',
          '_parse',
          '_media',
          '_or',
          '_and',
          '_not',
          '_ilike',
          '_in',
          '_is_null',
          '_like',
          '_neq',
          '_nilike',
          '_nin'
        ]
      }
    ],
    'no-plusplus': 'off',
    'no-self-compare': 'off',
    'no-return-await': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'no-use-before-define': 'off',
    'no-async-promise-executor': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-unused-vars': ['off', { argsIgnorePattern: '^_' }],
    'no-inline-comments': ['error', { ignorePattern: 'something' }],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
    ],
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/no-array-index-key': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/destructuring-assignment': 'off',
    'react/function-component-definition': 'off',
    'import/no-cycle': 'off',
    'import/extensions': 'off',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'import/no-import-module-exports': 'off',
    'import/no-extraneous-dependencies': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton']
      }
    ],
    //
    // 'lines-between-class-members': 'off',
    // 'react-hooks/rules-of-hooks': 'error',
    // 'no-warning-comments': [
    //   'error',
    //   { terms: ['TODO', 'FIXME', 'any other term'], location: 'anywhere' }
    // ],
    // 'import/first': 'error',
    // 'import/newline-after-import': 'error',
    // 'import/no-duplicates': 'off',
    // 'import/order': 'off',
    // 'import/named': 'off',
    // 'import/no-self-import': 'off',
    // 'import/no-useless-path-segments': 'off',
    // 'import/no-unresolved': 'off',
    // 'import/no-named-as-default-member': 'off',
    // 'react/jsx-key': 'error',
    // 'jsx-a11y/alt-text': 'off',
    // 'jsx-a11y/control-has-associated-label': 'off',
    // '@typescript-eslint/no-use-before-define': [
    //   'error',
    //   { functions: true, classes: true, variables: false }
    // ],
    // 'no-unused-expressions': 'off',
    // 'no-useless-escape': 'off',
    // 'react/button-has-type': 'off',
    // eqeqeq: 'off'
    //
    'sonarjs/no-small-switch': 'off',
    'sonarjs/no-identical-functions': 'off',
    'sonarjs/no-identical-expressions': 'off',
    'sonarjs/no-nested-template-literals': 'off',
    'sonarjs/cognitive-complexity': ['error', 25],
    'security/detect-object-injection': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-switch': 'off',
    'unicorn/prefer-includes': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/new-for-builtins': 'off',
    'unicorn/catch-error-name': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/prefer-dom-node-append': 'off',
    'unicorn/consistent-destructuring': 'off',
    'unicorn/prefer-add-event-listener': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',
    'unicorn/prefer-object-from-entries': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          e: false,
          i: false,
          cb: false,
          db: false,
          fn: false,
          def: false,
          msg: false,
          res: false,
          dev: false,
          doc: false,
          err: false,
          dir: false,
          obj: false,
          val: false,
          arr: false,
          str: false,
          ctx: false,
          div: false,
          btn: false,
          req: false,
          ref: false,
          env: false,
          tmp: false,
          docs: false,
          prod: false,
          opts: false,
          args: false,
          curr: false,
          temp: false,
          props: false,
          param: false,
          params: false,
          cmd: {
            command: true
          },
          errCb: {
            handleError: true
          }
        }
      }
    ]
  },
  ignorePatterns: [
    // '/**/.gitlab/*',
    // '/**/.husky/*',
    // '/**/.next/*',
    // '/**/.swc/*',
    // '/**/.vscode/*',
    // '/**/public/*',
    '/**/node_modules/*',
    '/**/typings/graphql/codegen/*',
    '/**/pages/api/utils/sequelize/*'
  ]
};
