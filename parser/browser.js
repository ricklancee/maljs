"use strict";

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

  /**
   *  Mal requires a simple xml format so we can get away
   *  with using a very simple function to build one.
   */
  const toXml = function(object) {
    let xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>`;

    function getProps(obj) {
      for (let property in obj) {
        if (obj.hasOwnProperty(property)){
          if (obj[property].constructor == Object) {
            xmlString += `<${property}>`;
            getProps(obj[property]);
            xmlString += `</${property}>`;
          } else {
            xmlString += `<${property}>${obj[property]}</${property}>`;
          }
        }
      }
    }

    getProps(object);

    return xmlString;
  };

  return {
    toJson,
    toXml
  }
};

export default parser;
