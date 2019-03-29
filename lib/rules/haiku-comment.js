/**
 * @fileoverview Enforces haiku comments
 * @author skeate
 */
'use strict';

const syllable = require('syllable');

const zip = (xs, ys) => xs.map((x, i) => [x, ys[i]]);

module.exports = {
  meta: {
    docs: {
      description: 'Enforces haiku comments',
      category: 'Stylistic Issues',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          prefix: {type: 'string'},
          includeLineComments: {type: 'boolean'},
          includeBlockComments: {type: 'boolean'},
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const sourceCode = context.getSourceCode();
    const options = {
      prefix: '',
      includeLineComments: true,
      includeBlockComments: true,
      ...(context.options.length > 0 ? context.options[0] : {}),
    };

    return {
      Program() {
        const allComments = sourceCode.getAllComments();
        const normalizedCommentLines = [];

        if (options.includeLineComments) {
          allComments.forEach(c => {
            if (c.type !== 'Line') return;
            const trimmed = c.value.trim();
            const postprefix = trimmed.substr(options.prefix.length).trim();
            if (trimmed.startsWith(options.prefix) && postprefix.length > 0) {
              normalizedCommentLines.push({
                loc: c.loc,
                value: postprefix,
              });
            }
          });
        }

        if (options.includeBlockComments) {
          allComments.forEach(c => {
            if (c.type !== 'Block') return;
            c.value.split('\n').forEach((line, lineno) => {
              const trimmed = line.trim().replace(/^\* */, '');
              const postprefix = trimmed.substr(options.prefix.length).trim();
              if (trimmed.startsWith(options.prefix) && postprefix.length > 0) {
                const relativeLineNo = c.loc.start.line + lineno;
                const startCol = line.indexOf(trimmed);
                const endCol = startCol + trimmed.length;
                normalizedCommentLines.push({
                  loc: {
                    start: {
                      line: relativeLineNo,
                      column: startCol,
                    },
                    end: {
                      line: relativeLineNo,
                      column: endCol,
                    },
                  },
                  value: postprefix,
                });
              }
            });
          });
        }

        for (let i = 0; i < normalizedCommentLines.length; i++) {
          if (i + 2 >= normalizedCommentLines.length) {
            context.report({
              message: 'Not enough lines for haiku',
              loc: normalizedCommentLines[i].loc,
            });
            i += 2;
          } else {
            const lines = [
              normalizedCommentLines[0],
              normalizedCommentLines[1],
              normalizedCommentLines[2],
            ];

            if (lines[2].loc.start.line - lines[0].loc.start.line > 2) {
              context.report({
                message: 'Not enough lines for haiku',
                loc: lines[0].loc,
              });
            } else {
              i += 2; // plus the one from the loop
              const syls = lines.map(l => syllable(l.value));
              if (syls[0] !== 5 || syls[1] !== 7 || syls[2] !== 5) {
                context.report({
                  message: `Comment not in haiku:\n${zip(lines, syls)
                    .map(([l, s]) => `${l.value} (${s})`)
                    .join('\n')}`,
                  loc: {
                    start: lines[0].loc.start,
                    end: lines[2].loc.end,
                  },
                });
              }
            }
          }
        }
      },
    };
  },
};
