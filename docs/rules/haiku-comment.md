# Enforce haiku comments (haiku-comment)

if you like haiku  
and want your comments to be  
enable this rule

blank lines are ignored.  
lines must be contiguous.  
there are some options.

## Rule Details

Examples of **incorrect** code for this rule:

```js
// this isn't haiku
```

Examples of **correct** code for this rule:

```js
// a bad example
// of haiku. but a good one
// for the linting rule.
```

### Options

- `"prefix": ""` (default) if you want haiku enforcement, but only for certain
  comments, you can use this to check for a prefix. the prefix must be on
  every line.

Examples:

```js
/* eslint  haiku:comment: ["error", { prefix: "~" }] */
// not haiku. but it's ok
//
// ~ however, this is.
// ~ and eslint will check it.
// ~ and complain if wrong.
```

- `"includeLineComments": true` (default) set to false if you only want to check
  haiku in `/* block comments */`.
- `"includeBlockComments": true` (default) set to false if you only want to
  check haiku in `// line comments`.

if you set both false,  
you might as well disable  
the entire rule.

## When Not To Use It

if you hate haiku  
or aren't quite crazy enough  
to require it.

## Further Reading

https://en.wikipedia.org/wiki/Haiku
