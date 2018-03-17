# Secrets

This folder is a place to store things that aren't checked into version control.

When you clone this repository, you'll notice that `npm run` throws an error telling you to look here.

To fix these errors, you must create a `secrets-data.json` file in this folder (i.e. `/config/secrets/secrets-data.json`). It is not called `secrets.json` as typescript gets confused when two files differ only by extension.

This file will have the following format:

```json
{
    "cookieSecret": "random string of characters"
}
```

Obviously do not use the placeholder `"random string of characters"`. If you need to generate a random string of characters, running the following in a console somewhere.

```javascript
let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let string = "";
for (let i = 0; i < 64; i++) {
    string.push(letters[Math.floor(Math.random() * 52)]);
}
console.log(string);
```

A 64 character string is sufficient unless you tell someone what it is.
