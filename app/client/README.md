# `app/client/`

This directory is for files that are compiled and loaded client-side.

In `scripts/`, `index.ts` is the only file that is compiled directly.
Anything else to be included needs to be imported.
While webpack will grab files from anywhere,
it is more readable to keep files specifically for client-side here.
One exception is including files in `node_modules`.

Be careful importing things,
as it can seriously increase file size.

Sourcemaps are included for typescript
if NODE_ENV is "development"
or undefined.

Likewise, in `styles/`, `index.less` is the only file that is compiled.
Anything else to be included needs to be imported.
While less will grab files from anywhere,
it is more readable to keep files specifically for client-side here.
