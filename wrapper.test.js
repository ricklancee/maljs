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

  t.context.api = wrapper(t.context.request, t.context.parser, 'someuser', 'somepass');
});

test('it is able to search an anime', async t  => {
    const animeResults = await t.context.api.search('full metal', 'anime');
    const animeResultsShorthand = await t.context.api.anime.search('full metal');

    t.is(t.context.requestStub.args[0][0], "https://myanimelist.net/api/anime/search.xml?q=full%20metal");
    t.is(t.context.parserStub.args[0][0], xmlString);
    t.is(t.context.requestStub.args[1][0], "https://myanimelist.net/api/anime/search.xml?q=full%20metal");
    t.is(t.context.parserStub.args[1][0], xmlString);
    t.deepEqual(animeResults, jsonData);
    t.deepEqual(animeResultsShorthand, jsonData);
});

test('it should throw an error when calling search() with an invalid type', t => {
    const notatype = 'notatype';

    t.throws(_ => {
      t.context.api.search('somesearchquery', notatype)
    }, `Only types 'anime' and manga' are supported; Type "${notatype}" is not.`);
});

test('it should be able to list the users animelist', async t => {

  const status = 'watching';
  const user = 'someuser';
  const type = 'anime';

  const animeResults = await t.context.api.list('anime', status);
  const animeResultsShorthand = await t.context.api.anime.list(status);

  t.is(t.context.requestStub.args[0][0], `https://myanimelist.net/malappinfo.php?u=${user}&status=${status}&type=${type}`);
  t.is(t.context.parserStub.args[0][0], xmlString);
  t.is(t.context.requestStub.args[1][0], `https://myanimelist.net/malappinfo.php?u=${user}&status=${status}&type=${type}`);
  t.is(t.context.parserStub.args[1][0], xmlString);
  t.deepEqual(animeResults, jsonData);
  t.deepEqual(animeResultsShorthand, jsonData);
});

test('ommiting a status defaults to "all"', async t => {
  const user = 'someuser';
  const type = 'anime';
  const animeResults = await t.context.api.list('anime');
  t.is(t.context.requestStub.args[0][0], `https://myanimelist.net/malappinfo.php?u=${user}&status=all&type=${type}`);
});

test.todo('add anime method');
test.todo('update anime method');
test.todo('delete anime method');
test.todo('verify credentials method');
