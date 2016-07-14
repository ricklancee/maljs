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
  .catch(err => err);

// adds an anime to the list
api.add('71', { // '71' is the animes ID (retrieved from search())
  "entry": {
    "episode": "1",
    "status": "6", // 1/watching, 2/completed, 3/onhold, 4/dropped, 6/plantowatch
    "score": "7"
  }
})
.then(result => result)
.catch(err => err);

// Updates an anime on the list
api.update('71', {
  "entry": {
    "status": "1"
  }
})
.then(result => result)
.catch(err => err);

// Deletes an anime from the list
api.delete('71')
.then(result => result)
.catch(err => err);

// Verify the users credentials
api.verifyCredentials()
  .then(result => result)
  .catch(err => err);

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
