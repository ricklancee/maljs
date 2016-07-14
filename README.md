# MALjs

A json promise api wrapper for the MAL (myanimelist) api.

### Support
All api requests return promises. Use a Promise polyfill if neccesarry.

### Usage

```js
// create an new api instance with your myanimelist user name and password
var api = new MALjs('MAL username', 'MAL password');

// search my animelist
api.search('search string')
  .then(result => result) // contains the json result on success
  .catch(err => err); // contains an error message if the request fails

// Get the authenticated users animelist
api.list()
  .then(result => result)
  .catch(err => err) 

// Verify the users credentials
api.verifyCredentials()
  .then(result => result)
  .catch(err => err) 

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
