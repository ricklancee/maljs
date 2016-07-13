describe('MALjs suite', () => {
  var mal;

  beforeEach(function() {
    mal = new MALjs(_ENV.user, _ENV.password);
  });

  it('should be able to set credentials', () => {
    expect(mal.user).toBe(_ENV.user);
    expect(mal.password).toBe(_ENV.password);
  });


});
