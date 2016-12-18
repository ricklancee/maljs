"use strict";

import xml2js from 'xml2js';
import convertTypes from './convert-types';
import toXml from './to-xml';

const parser = function() {
  const xmlParser = new xml2js.Parser({explicitArray: false});

  const toJson = function(xmlString) {
    return new Promise((resolve, reject) => {
      let resultObj = {};
      xmlParser.parseString(xmlString, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        // If it's an search xml response; Strip out entry props and convert types
        if (result.anime && result.anime.entry) {
          const entries = result.anime.entry;
          resultObj = convertTypes(entries);
        } else if (result.manga && result.manga.entry) {
          const entries = result.manga.entry;
          resultObj = convertTypes(entries);
        }

        // If it's an animelist xml response;
        if (result.myanimelist) {
          result.myanimelist.myinfo = convertTypes([result.myanimelist.myinfo]).pop();

          if (!Array.isArray(result.myanimelist.anime)) {
            result.myanimelist.anime = convertTypes([result.myanimelist.anime]);
          } else {
            result.myanimelist.anime = convertTypes(result.myanimelist.anime);
          }

          resultObj = {myinfo: result.myanimelist.myinfo, anime: result.myanimelist.anime};
        }

        resolve(resultObj);
      });
    });
  };

  return {
    toJson,
    toXml
  }
};

export default parser;
