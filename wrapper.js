"use strict";

const wrapper = function(request, parser, user = null, pass = null) {
  const baseUrl = 'https://myanimelist.net';
  const username = user;
  const password = pass;

  const getAndParseXml = function(endpoint) {
    return request.get(endpoint).then(xml => {
      return parser.toJson(xml);
    });
  };

  const dataToXmlAndPost = function(endpoint, json) {
    return parser.toXml(json).then(xml => {
      return request.post(endpoint, xml);
    });
  };

  const checkType = function(type) {
    if (type !== 'anime' && type !== 'manga') {
      throw new Error(`Only types 'anime' and manga' are supported; Type "${type}" is not.`);
    }
  };

  return {
    search(query, type) {
      checkType(type);

      const endpoint = `${baseUrl}/api/${type}/search.xml?q=${encodeURIComponent(query)}`;

      return getAndParseXml(endpoint);
    }
  }
}

export default wrapper;
