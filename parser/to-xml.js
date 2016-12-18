/**
 *  Mal requires a simple xml format so we can get away
 *  with using a very simple function to build one.
 */
const toXml = function(object) {
  let xmlString = `<?xml version="1.0" encoding="UTF-8"?>`;

  function makeXml(obj) {
    for (let property in obj) {
      if (obj.hasOwnProperty(property)){
        if (object[property] === null) {
          xmlString += `<${property}></${property}>`;
        } else {
          xmlString += `<${property}>${obj[property]}</${property}>`;
        }
      }
    }
  }

  if (!Array.isArray(object)) {
    xmlString += `<entry>`;
    makeXml(object);
    xmlString += `</entry>`;
  } else {
    object.forEach(entry => {
      xmlString += `<entry>`;
      makeXml(entry);
      xmlString += `</entry>`;
    });
  }

  return xmlString;
};

export default toXml;
