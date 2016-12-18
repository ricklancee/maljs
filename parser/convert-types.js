"use strict";

const types = {
  id: 'int',
  title: 'string',
  english: 'string',
  synonyms: 'string',
  episodes: 'int',
  score: 'float',
  type: 'string',
  status: 'string',
  start_date: 'string',
  end_date: 'string',
  synopsis: 'string',
  image: 'string',
  user_id: 'int',
  user_name: 'string',
  user_watching: 'int',
  user_completed: 'int',
  user_onhold: 'int',
  user_dropped: 'int',
  user_plantowatch: 'int',
  user_days_spent_watching: 'float',
  series_animedb_id: 'int',
  series_title: 'string',
  series_synonyms: 'string',
  series_type: 'int',
  series_episodes: 'int',
  series_status: 'int',
  series_start: 'string',
  series_end: 'string',
  series_image: 'string',
  my_id: 'int',
  my_watched_episodes: 'int',
  my_start_date: 'string',
  my_finish_date: 'string',
  my_score: 'int',
  my_status: 'int',
  my_rewatching: 'int',
  my_rewatching_ep: 'int',
  my_last_updated: 'int',
  my_tags: 'string'
};

const convertTypes = function(objects) {
  const result = [];

  objects.forEach(object => {
    const convertedObject = {};

    for(let prop in object) {
      switch(types[prop]) {
        case 'int':
          convertedObject[prop] = parseInt(object[prop]);
          break;
        case 'float':
          convertedObject[prop] = parseFloat(object[prop]);
          break;
        case 'date':
          convertedObject[prop] = new Date(object[prop]);
          break;
        case 'string':
        default:
          convertedObject[prop] = object[prop];
          break;
      }
    }

    result.push(convertedObject);
  });


  return result;
};

export default convertTypes;
