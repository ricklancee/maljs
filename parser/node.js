"use strict";

import xml2js from 'xml2js';
import convertTypes from './convert-types';
import toXml from './to-xml';

const parser = function() {
  const xmlParser = new xml2js.Parser({explicitArray: false});

  const toJson = function(xmlString) {
    return new Promise((resolve, reject) => {
      let result = {};
      xmlParser.parseString(xmlString, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        // Strip out entry props and convert types
        if (result.anime && result.anime.entry) {
          const entries = result.anime.entry;
          result = convertTypes(entries);
        }

        if (result.manga && result.manga.entry) {
          const entries = result.manga.entry;
          result = convertTypes(entries);
        }

        resolve(result);
      });
    });
  };

  return {
    toJson,
    toXml
  }
};

export default parser;
