import test from 'ava';
import convertTypes from './convert-types';

test('it is should be able to convert stings to the correct types', async t  => {

  const converted = convertTypes([{
    id: '1',
    title: 'string',
    english: 'string',
    synonyms: 'string',
    episodes: '1',
    score: '1.1',
    type: 'string',
    status: 'string',
    start_date: 'string',
    end_date: 'string',
    synopsis: 'string',
    image: 'string'
  }]);

  t.deepEqual(converted, [{
    id: 1,
    title: 'string',
    english: 'string',
    synonyms: 'string',
    episodes: 1,
    score: 1.1,
    type: 'string',
    status: 'string',
    start_date: 'string',
    end_date: 'string',
    synopsis: 'string',
    image: 'string'
  }]);
});
