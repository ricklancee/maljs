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
    image: 'string',
    user_id: '1',
    user_name: 'string',
    user_watching: '1',
    user_completed: '1',
    user_onhold: '1',
    user_dropped: '1',
    user_plantowatch: '1',
    user_days_spent_watching: '1.1',
    series_animedb_id: '1',
    series_title: 'string',
    series_synonyms: 'string',
    series_type: '1',
    series_episodes: '1',
    series_status: '1',
    series_start: 'string',
    series_end: 'string',
    series_image: 'string',
    my_id: '1',
    my_watched_episodes: '1',
    my_start_date: 'string',
    my_finish_date: 'string',
    my_score: '1',
    my_status: '1',
    my_rewatching: '1',
    my_rewatching_ep: '1',
    my_last_updated: '1',
    my_tags: 'string'
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
    image: 'string',
    user_id: 1,
    user_name: 'string',
    user_watching: 1,
    user_completed: 1,
    user_onhold: 1,
    user_dropped: 1,
    user_plantowatch: 1,
    user_days_spent_watching: 1.1,
    series_animedb_id: 1,
    series_title: 'string',
    series_synonyms: 'string',
    series_type: 1,
    series_episodes: 1,
    series_status: 1,
    series_start: 'string',
    series_end: 'string',
    series_image: 'string',
    my_id: 1,
    my_watched_episodes: 1,
    my_start_date: 'string',
    my_finish_date: 'string',
    my_score: 1,
    my_status: 1,
    my_rewatching: 1,
    my_rewatching_ep: 1,
    my_last_updated: 1,
    my_tags: 'string'
  }]);
});

test('when convert an unkown property, default to a string', async t  => {
  const converted = convertTypes([{
    id: '1',
    notknowproperty: '1'
  }]);

  t.deepEqual(converted, [{
    id: 1,
    notknowproperty: '1'
  }]);
});
