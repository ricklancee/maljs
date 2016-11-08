# MALjs

A promise based json api wrapper for the MAL (myanimelist) api. http://myanimelist.net/modules.php?go=api

This api has not been tested in production environments, use at your own risk. 

### Support
ES6 files need to be converted to ES5 to ensure maximum browser support. Polyfills for the Promise API need to be included in browsers that lack support. See the `polyfills/` directory for an example for a polyfill script.

### Usage

Anime calls are made with `API.anime.METHOD`, manga calls with `API.manga.METHOD`. See below for an example.

```js
// create an new api instance with your myanimelist user name and password
const mal = new MALjs('MAL username', 'MAL password');

// search my animelist
mal.anime.search('search string')
  .then(result => result) // contains the json result on success
  .catch(err => err); // contains an error message if the request fails

// Get the authenticated users animelist
mal.anime.list()
  .then(result => result)
  .catch(err => err);

// adds an anime to the list
mal.anime.add('71', { // '71' is the animes ID (retrieved from search())
  episode: "1",
  status: "6", // 1/watching, 2/completed, 3/onhold, 4/dropped, 6/plantowatch
  score: "7"
})
  .then(result => result)
  .catch(err => err);

// Updates an anime on the list
mal.anime.update('71', {
  status: "1"
})
  .then(result => result)
  .catch(err => err);

// Deletes an anime from the list
mal.anime.delete('71')
  .then(result => result)
  .catch(err => err);

// Verify the users credentials
api.verifyCredentials()
  .then(result => result)
  .catch(err => err);

```

Anime values 
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

Manga Values  
- chapter. *int*
- volume. *int*
- status. *int OR string. 1/reading, 2/completed, 3/onhold, 4/dropped, 6/*plantoread
- score. *int*
- times_reread. *int*
- reread_value. *int*
- date_start. *date. mmddyyyy*
- date_finish. *date. mmddyyyy*
- priority. *int*
- enable_discussion. *int. 1=enable, 0=disable*
- enable_rereading. *int. 1=enable, 0=disable*
- comments. *string*
- scan_group. *string*
- tags. *string. tags separated by commas*
- retail_volumes. *int*

### Fun with promises
Since the api uses promises you can use things like chaining and parallel requests.

*Chaining requests*

```js
var api = new MALjs('MAL username', 'MAL password');

// Make the first request
api.search('Full Metal')
  .then(result => {
    // result.anime.entry contains an array of animes matching the search query
    var animeId =  result.anime.entry[0].id;

    // Make a new request, adding the anime to the users list
    return api.anime.add(animeId);
  })
  .then(result => {
    console.log('Anime added!', result);
  })
  .catch(err => {
    console.log('Something went wrong!', err);
  });
```

*Parallel request*

```js
var api = new MALjs('MAL username', 'MAL password');

// Add multiple anime to the users myanimelist.
Promise.all([
  api.anime.add('71'),
  api.anime.add('231'),
  api.anime.add('71')
])
  // When all promises resolve.
  .then(results => {
    console.log('All anime were added!', results);
  })
   // When one promise fails, all fail.
  .catch(err => {
    console.log('Something went wrong!', err);
  });
```

### Build es5 files
Install dependencies with `npm install`.  
Run `npm run build` to build files.  

### Testing

**NOTE: Tests are run against the live MAL Api, Don't use your actual MAL account if you don't want to alter your list**

If you want to test locally run chrome with the ` --args --disable-web-security --user-data-dir` commands, becuase MAL blocks request from a non-origin.

In order to test add the file `env.js` to the project root. Add your MAL credentials to be able to send requests to the MAL api.

```js
// env.js contents
window._ENV = {
  user: 'username',
  password: 'password',
};
```

Open `test.html` to run tests.
