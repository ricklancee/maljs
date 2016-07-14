# MALjs

A json api wrapper for the MAL (myanimelist) api


### usage

```js
// create an new api instance with your myanimelist user name and 
// password
var api = new MALjs('MAL username', 'MAL password');

// make an api request to /search
// api requests return promises.
api.search('search string')
  .then(result => console.log(result)) // contains the json result on success
  .catch(err => console.log(err)); // contains an error message if the request fails
```


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
