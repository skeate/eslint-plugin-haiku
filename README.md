# eslint-plugin-haiku

if you like haiku  
and want your comments to be  
install this plugin

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-haiku`:

```
$ npm install eslint-plugin-haiku --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-haiku` globally.

## Usage

Add `haiku` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["haiku"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "haiku/haiku-comments": 2
  }
}
```

## Supported Rules

- [haiku-comments](docs/rules/haiku-comment.md)
