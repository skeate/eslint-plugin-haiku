/**
 * @fileoverview Enforces haiku comments
 * @author skeate
 */
import rule from '../../../lib/rules/haiku-comment.js'
import { RuleTester } from 'eslint'
let ruleTester = new RuleTester()

ruleTester.run('haiku-comment', rule, {
  valid: [
    // Default options
    {
      code: `
        // this is a haiku
        // syllables: five seven five
        // refrigerator
      `,
    },
    {
      code: `
        /* this is another
         * haiku for testing lint rule
         * abracadabra
         */
      `,
    },
    {
      code: `
        // time to check for gaps
        // will it error if they're here?
        // i certainly hope
        //
        // my fingers are crossed
        // lucky rabbit's foot in use
        // let's hope it all works
      `,
    },
    {
      code: `
        /* another gap test
         * but this time for block comments
         * fingers crossed again
         *
         * will it succeed? or
         * will it stumble on the void
         * run the test to see
         */
      `,
    },

    // prefix
    {
      code: `
        // ~ prefixes help devs
        // ~ not go quite so far insane
        // ~ obligatory
      `,
      options: [{ prefix: '~' }],
    },
    {
      code: `
        /* \u{1F333} emoji prefix
         * \u{1F333} because, why not, honestly
         * \u{1F333} arborization
         */
      `,
      options: [{ prefix: '🌳' }],
    },
    {
      code: `
        // this isn't haiku.
        // sorry.
      `,
      options: [{ prefix: '#' }],
    },
    {
      code: `/* neither is this */`,
      options: [{ prefix: '.' }],
    },
  ],
  invalid: [
    {
      code: '// not a haiku',
      errors: [{ message: 'Not enough lines for haiku' }],
    },
    {
      code: `
        // not a haiku
        // but it has enough lines
        // freezer
      `,
      errors: [
        {
          message: `Comment not in haiku:
not a haiku (4)
but it has enough lines (6)
freezer (2)`,
        },
      ],
    },
    {
      code: '/* also not haiku */',
      errors: [{ message: 'Not enough lines for haiku' }],
    },
    {
      code: `/*
also not haiku
but it also has enough lines
frobozz electric
*/`,
      errors: [
        {
          message: `Comment not in haiku:
also not haiku (5)
but it also has enough lines (8)
frobozz electric (5)`,
        },
      ],
    },
    // prefix
    {
      code: '// $ not a haiku',
      options: [{ prefix: '$' }],
      errors: [{ message: 'Not enough lines for haiku' }],
    },
  ],
})
