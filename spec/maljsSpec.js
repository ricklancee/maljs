describe('MALjs suite', () => {
  var mal;

  beforeEach(function() {
    mal = new MALjs(_ENV.user, _ENV.password);
  });

  it('should be able to set credentials', () => {
    expect(mal.user).toBe(_ENV.user);
    expect(mal.password).toBe(_ENV.password);
  });

  it('should throw an exception when passing in no credentials', function() {
    expect(function() {
      new MALjs(_ENV.user);
    }).toThrow();
  });

  it('should be able to convert an object to an xml string', function() {
    var xmlString = mal._toXml({
      "episode": "1",
      "status": "6",
      "score": "7"
    });
    expect(xmlString).toBe('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><episode>1</episode><status>6</status><score>7</score>');
  });

  describe('search()', () => {
    var failed;
    var response;

    beforeEach((done) => {
      mal = new MALjs(_ENV.user, _ENV.password);
      mal.search('full metal')
        .then(result => {
          failed = false;
          response = result;
          console.log('success:', result);
          done();
        })
        .catch(err => {
          failed = true;
          console.log('error:', err);
          done();
        });
    });

    it('should be able to search an anime', () => {
      expect(failed).toBe(false);
    });

    it('should return a json response on success', () => {
      expect(typeof response).toBe('object');
    });

    it('should contain an anime item', () => {
      expect(typeof response.anime).toBe('object');
      expect(response.anime.entry.length).toBeGreaterThan(0);
    });

  });

  describe('verifyCredentials()', () => {
    var failed;
    var response;

    beforeEach((done) => {
      mal = new MALjs(_ENV.user, _ENV.password);
      mal.verifyCredentials()
        .then(result => {
          failed = false;
          response = result;
          console.log('success:', result);
          done();
        })
        .catch(err => {
          failed = true;
          console.log('error:', err);
          done();
        });
    });

    it('should be able to retrieve user details', () => {
      expect(failed).toBe(false);
    });
  });

  describe('list()', () => {
    var failed;
    var response;

    beforeEach((done) => {
      mal = new MALjs(_ENV.user, _ENV.password);
      mal.list()
        .then(result => {
          failed = false;
          response = result;
          console.log('success:', result);
          done();
        })
        .catch(err => {
          failed = true;
          console.log('error:', err);
          done();
        });
    });

    it('should be able to retrieve user anime list', () => {
      expect(failed).toBe(false);
    });
  });

  describe('add()', () => {
    var failed;
    var response;

    beforeEach((done) => {
      mal = new MALjs(_ENV.user, _ENV.password);

      mal.add('71', {
        "episode": "1",
        "status": "6",
        "score": "7"
      })
      .then(results => {
        return mal.list();
      })
      .then(results => {
        console.log(results);
        failed = false;
        response = results;
        done();
      })
      .catch(err => {
        failed = true;
        console.log('error:', err);
        done();
      });
    });

    it('should be able to add an anime to the list', () => {
      expect(failed).toBe(false);
      expect(response.myanimelist).toBeDefined();
      expect(response.myanimelist.anime.series_animedb_id).toBe('71');
      expect(response.myanimelist.anime.my_status).toBe('6');
      expect(response.myanimelist.anime.my_watched_episodes).toBe('1');
    });
  });

  describe('update()', () => {
    var failed;
    var response;

    beforeEach((done) => {
      mal = new MALjs(_ENV.user, _ENV.password);

      mal.update('71', {
        "episode": "2",
        "status": "1",
        "score": "7"
      })
      .then(results => {
        return mal.list();
      })
      .then(results => {
        console.log(results);
        failed = false;
        response = results;
        done();
      })
      .catch(err => {
        failed = true;
        console.log('error:', err);
        done();
      });
    });

    it('should be able to update an anime to the list', () => {
      expect(failed).toBe(false);
      expect(response.myanimelist).toBeDefined();
      expect(response.myanimelist.anime.series_animedb_id).toBe('71');
      expect(response.myanimelist.anime.my_status).toBe('1');
      expect(response.myanimelist.anime.my_watched_episodes).toBe('2');
    });
  });

  describe('delete()', () => {
    var failed;
    var response;

    beforeEach((done) => {
      mal = new MALjs(_ENV.user, _ENV.password);

      mal.delete('71')
      .then(results => {
        return mal.list();
      })
      .then(results => {
        console.log(results);
        failed = false;
        response = results;
        done();
      })
      .catch(err => {
        failed = true;
        console.log('error:', err);
        done();
      });
    });

    it('should be able to delete an anime from the list', () => {
      expect(failed).toBe(false);
      expect(response.myanimelist.anime).not.toBeDefined();
    });
  });

});
