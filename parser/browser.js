"use strict";

import convertTypes from './convert-types';
import toXml from './to-xml';

const parser = function() {
  const domParser = new DOMParser();

  const xmlStringToDom = function(xmlString) {
    const dom = domParser.parseFromString(xmlString, "text/xml");

    if (!dom || dom.documentElement.nodeName === "html") {
      throw new Error('Failed to parse xml.');
    }

    return dom;
  }

  const toJson = function(xmlString) {

  };

  return {
    toJson,
    toXml
  }
};

export default parser;
