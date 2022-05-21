/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
exports.fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args))
