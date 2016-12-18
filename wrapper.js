"use strict";

const wrapper = function(request, parser, user = null, pass = null) {
  const baseUrl = 'https://myanimelist.net';
  const username = user;
  const password = pass;
  const allowedTypes = ['anime', 'manga'];
  const allowedStatuses = ['all', 'watching', 'completed', 'onhold', 'dropped', 'plantowatch'];

  const getAndParseXml = function(endpoint) {
    return request.get(endpoint, {
      auth: {
        username,
        password
      }
    }).then(xml => {
      return parser.toJson(xml);
    });
  };

  const dataToXmlAndPost = function(endpoint, json) {
    return parser.toXml(json).then(xml => {
      return request.post(endpoint, {
        auth: {
          username,
          password
        }
      }, xml);
    });
  };

  const checkType = function(type) {
    if (type !== 'anime' && type !== 'manga') {
      throw new Error(`Only types 'anime' and manga' are supported; Type "${type}" is not.`);
    }
  };

  const checkStatusType = function(status) {
    if (allowedStatuses.indexOf(status) === -1) {
      throw new Error(`Only staus types "${allowedStatuses.join(', ')}" are supported; Status Type "${status}" is not.`);
    }
  };

  // Endpoint calls
  const search = function(query, type) {
    checkType(type);

    const endpoint = `${baseUrl}/api/${type}/search.xml?q=${encodeURIComponent(query)}`;

    return getAndParseXml(endpoint);
  };

  const list = function(type, status = 'all') {
    checkType(type);
    checkStatusType(status);

    const endpoint = `${baseUrl}/malappinfo.php?u=${username}&status=${status}&type=${type}`;

    return getAndParseXml(endpoint);
  }

  return {
    anime: {
      search: (query) => search(query, 'anime'),
      list: (status) => list('anime', status)
    },
    search,
    list
  }
}

export default wrapper;
