import test from 'ava';
import sinon from 'sinon';
import wrapper from './wrapper';

import {xmlString, jsonData} from './datastub';

test.beforeEach(t => {
  t.context.request = {
    get: () => {},
    post: () => {}
  };
  t.context.parser = {
    toJson: () => {},
    toXml: () => {}
  };

  t.context.requestStub = sinon.stub(t.context.request, 'get', () => {
    return new Promise(resolve => {
      resolve(xmlString);
    });
  });

  t.context.parserStub = sinon.stub(t.context.parser, 'toJson', () => {
    return new Promise(resolve => {
      resolve(jsonData);
    });
  });

  t.context.username = 'someuser';
  t.context.password = 'somepass';

  t.context.api = wrapper(t.context.request, t.context.parser, t.context.username, t.context.password);
});

function testEndpoint(t, endpoint, animeResults, animeResultsShorthand = null) {
  t.is(t.context.requestStub.args[0][0], endpoint);
  t.deepEqual(t.context.requestStub.args[0][1], {
    auth: {
      username: t.context.username,
      password: t.context.password
    }
  });
  t.is(t.context.parserStub.args[0][0], xmlString);

  if (animeResultsShorthand) {
    t.is(t.context.requestStub.args[1][0], endpoint);
    t.deepEqual(t.context.requestStub.args[1][1], {
      auth: {
        username: t.context.username,
        password: t.context.password
      }
    });
    t.is(t.context.parserStub.args[1][0], xmlString);
    t.deepEqual(animeResults, jsonData);
    t.deepEqual(animeResultsShorthand, jsonData);
  }
}

test('it is able to search an anime', async t  => {
    const animeResults = await t.context.api.search('full metal', 'anime');
    const animeResultsShorthand = await t.context.api.anime.search('full metal');

    testEndpoint(t, "https://myanimelist.net/api/anime/search.xml?q=full%20metal", animeResults, animeResultsShorthand);
});

test('it should throw an error when calling search() with an invalid type', t => {
    const notatype = 'notatype';

    t.throws(_ => {
      t.context.api.search('somesearchquery', notatype)
    }, `Only types 'anime' and manga' are supported; Type "${notatype}" is not.`);
});

test('it should be able to list the users animelist', async t => {

  const status = 'watching';
  const type = 'anime';

  const animeResults = await t.context.api.list('anime', status);
  const animeResultsShorthand = await t.context.api.anime.list(status);

  testEndpoint(t, `https://myanimelist.net/malappinfo.php?u=${t.context.username}&status=${status}&type=${type}`, animeResults, animeResultsShorthand);
});

test('ommiting a status defaults to "all"', async t => {
  const type = 'anime';
  const animeResults = await t.context.api.list('anime');

  testEndpoint(t, `https://myanimelist.net/malappinfo.php?u=${t.context.username}&status=all&type=${type}`, animeResults);
});

test.todo('add anime method');
test.todo('update anime method');
test.todo('delete anime method');
test.todo('verify credentials method');
