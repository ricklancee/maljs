# MALjs

A json promise api wrapper for the MAL (myanimelist) api. http://myanimelist.net/modules.php?go=api

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
  "episode": "1",
  "status": "6", // 1/watching, 2/completed, 3/onhold, 4/dropped, 6/plantowatch
  "score": "7"
})
  .then(result => result)
  .catch(err => err);

// Updates an anime on the list
api.update('71', {
  "status": "1"
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

Anime values *used as data in `add()` and `update()` calls*
- episode. *int*
- status. *int OR string. 1/watching, 2/completed, 3/onhold, 4/dropped, 6/plantowatch*
- score. *int*
- storage_type. *int*
- storage_value. *float*
- times_rewatched. *int*
- rewatch_value. *int*
- date_start. *date. mmddyyyy*
- date_finish. *date. mmddyyyy*
- priority. *int*
- enable_discussion. *int. 1=enable, 0=disable*
- enable_rewatching. *int. 1=enable, 0=disable*
- comments. *string*
- fansub_group. *string*
- tags. *string. tags separated by commas*

### Fun with promises
Since the api uses promises you can use things like chaining and parralell requests.

*Chaining requests*

```js
var api = new MALjs('MAL username', 'MAL password');

// Make the first request
api.search('Full Metal')
  .then(result => {
    // result.anime.entry contains an array of matching animes
    var animeId =  result.anime.entry[0].id;

    // Make a new request.
    return api.add(animeId);
  })
  .then(result => {
    console.log('Anime added!', result);
  })
  .catch(err => {
    console.log('Something went wrong', err);
  });
```

*Parallel request*

```js
var api = new MALjs('MAL username', 'MAL password');

// Add multiple animes to myanimelist.
Promise.all([api.add('71'), api.add('231'), api.add('71')])
.then(results => {
  console.log('All anime are added!', results);
}) // When all promises resolve
.catch(err => {
  console.log('Something went wrong', err);
}) // when one fails all fail
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
