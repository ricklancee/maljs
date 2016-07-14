describe('MALjs suite', () => {
  var mal;

  beforeEach(function() {
    mal = new MALjs(_ENV.user, _ENV.password);
  });

  it('should be able to set credentials', () => {
    expect(mal.user).toBe(_ENV.user);
    expect(mal.password).toBe(_ENV.password);
  });

  describe('/search', () => {
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
});
