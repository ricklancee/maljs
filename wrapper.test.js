import test from 'ava';
import sinon from 'sinon';
import wrapper from './wrapper';

import {xmlString, jsonData} from './datastub';

let request, parser;

test.beforeEach(() => {
  request = {
    get: () => {},
    post: () => {}
  };
  parser = {
    toJson: () => {}
  };
});

test('it is able to search an anime', async t  => {

    const requestStub = sinon.stub(request, 'get', () => {
      return new Promise(resolve => {
        resolve(xmlString);
      });
    });

    const parserStub = sinon.stub(parser, 'toJson', () => {
      return new Promise(resolve => {
        resolve(jsonData);
      });
    });

    const api = wrapper(request, parser);

    const animeResults = await api.search('full metal', 'anime');

    t.is(requestStub.args[0][0], "https://myanimelist.net/api/anime/search.xml?q=full%20metal");
    t.is(parserStub.args[0][0], xmlString);
    t.deepEqual(animeResults, jsonData);
});

test('it should throw an error when calling search() with an invalid type', t => {
    const api = wrapper(request, parser);
    const notatype = 'notatype';

    t.throws(_ => {
      api.search('somesearchquery', notatype)
    }, `Only types 'anime' and manga' are supported; Type "${notatype}" is not.`);
});

test.todo('add anime method');
test.todo('update anime method');
test.todo('delete anime method');
test.todo('get animelist method');
test.todo('verify credentials method');
