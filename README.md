# MALjs

A json api wrapper for the MAL (myanimelist) api


### Build

Install dependencies with `npm install`.

Run `npm run build` to build source files.
Run `npm run watch` to watch file changes and build source files.

### Testing

In order to test add the file `env.js` to the project root. Add your MAL credentials to be able to send requests to the MAL api.

```js
// env.js contents
window._ENV = {
  user: 'username',
  password: 'password',
};
```

Open the `test.html` file to run the Jasmine test suite.
