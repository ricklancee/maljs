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
  image: 'string'
};

const convertTypes = function(objects) {
  const result = [];

  objects.forEach(object => {
    const convertedObject = {};

    for(let prop in object) {
      if (types.hasOwnProperty(prop)) {
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
    }

    result.push(convertedObject);
  });


  return result;
};

export default convertTypes;
