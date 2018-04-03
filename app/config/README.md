# `app/config/`

The `config-data.json` file cannot
be checked into version control.
It contains things that may vary from clone to clone,
or things that are not public (e.g. private keys).

When you clone this repository,
you'll notice that `npm run` throws an error telling you to look here.

To fix these errors,
you must create a `config-data.json` file in this directory
(i.e. `/config/config-data.json`).
It is not called `config.json` as typescript gets confused
when two files differ only by extension.

This file will have the following format:

```json
{
    "cookieSecret": "random string of characters"
}
```

Obviously do not use the placeholder `"random string of characters"`.

If you need to generate a random string of characters,
running the following in a console somewhere.

```javascript
const array = new Uint8Array(64);
const letters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-"
    .split("");
window.crypto.getRandomValues(array);
let string = "";
array.forEach(value => string += letters[value % 64];
console.log(string);
```

A 64 character string is sufficient.
