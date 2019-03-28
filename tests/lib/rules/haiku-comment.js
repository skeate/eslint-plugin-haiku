/**
 * @fileoverview Enforces haiku comments
 * @author skeate
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/haiku-comment"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("haiku-comment", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "// not a haiku",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
