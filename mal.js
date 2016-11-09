"use strict";

(function() {
  var isNode = typeof exports !== 'undefined';
  var xml2js;
  var request;

  if (isNode) {
    xml2js = require('xml2js');
    request = require('request');
  }

  class MALjs {

    constructor(user, password) {
      if (!user || !password) {
        throw new Error('MALjs requires a myanimelist.net username and password.');
      }

      this._user = user;
      this._password = password;
      this._base = 'https://myanimelist.net';

      this._parser = isNode ? new xml2js.Parser() : new DOMParser();

      this.anime = {
        search: (query) => {
          return this.search(query, 'anime');
        },
        list: () => {
          return this.list('anime');
        },
        add: (id, data) => {
          return this.add(id, data, 'anime');
        },
        update: (id, data) => {
          return this.update(id, data, 'anime');
        },
        delete: (id, data) => {
          return this.delete(id, 'anime');
        }
      };

      this.manga = {
        search: (query) => {
          return this.search(query, 'manga');
        },
        list: () => {
          return this.list('manga');
        },
        add: (id, data) => {
          return this.add(id, data, 'manga');
        },
        update: (id, data) => {
          return this.update(id, data, 'manga');
        },
        delete: (id, data) => {
          return this.delete(id, 'manga');
        }
      };

    }

    search(query, type) {
      this._checkType(type);

      return this._get(`${this._base}/api/${type}/search.xml?q=${query}`);
    }

    list(type) {
      this._checkType(type);
      return this._get(`${this._base}/malappinfo.php?u=${this._user}&status=all&type=${type}`);
    }

    add(id, data, type) {
      this._checkType(type);

      if (!data) {
        return;
      }

      if (!data.entry) {
        data = {entry: data};
      }

      return this._post(`${this._base}/api/${type}list/add/${id}.xml`, data);
    }

    update(id, data, type) {
      this._checkType(type);

      if (!data) {
        return;
      }

      if (!data.entry) {
        data = {entry: data};
      }

      return this._post(`${this._base}/api/${type}list/update/${id}.xml`, data);
    }

    delete(id, type) {
      this._checkType(type);
      return this._post(`${this._base}/api/${type}list/delete/${id}.xml`);
    }

    verifyCredentials() {
      return this._get(`${this._base}/api/account/verify_credentials.xml`);
    }

    _checkType(type) {
      if (type !== 'anime' && type !== 'manga') {
        throw new Error('Only allowed types are anime and manga. incorrect type: '+type +' given.')
      }
    }

    _xmlToJson(xmlString) {
      return new Promise((resolve, reject) => {
        if (isNode) {
          this._parser.parseString(xmlString, (err, result) => {

            // Strip out entry prop
            if (result.anime && result.anime.entry) {
              var entries = result.anime.entry;
              delete result.anime.entry;
              result.anime = entries;
            }

            if (result.manga && result.manga.entry) {
              var entries = result.manga.entry;
              delete result.manga.entry;
              result.manga = entries;
            }

            if (err) {
              reject(err);
            } else {
              resolve(result);
            }

          });
        } else {
          const dom = this._parser.parseFromString(xmlString, "text/xml");

          if (dom.documentElement.nodeName === "html") {
            reject('Failed to parse xml.');
          } else {
            resolve(this._domToJson(dom));
          }
        }
      });
    }

    _domToJson(dom) {
      const nodes = dom.childNodes;
      const object = {};

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node.nodeName === 'myanimelist') {
          object[node.nodeName] = {};
        } else {
          object[node.nodeName] = [];
        }


        const childNodes = node.childNodes;


        for (let i = 0; i < childNodes.length; i++) {
          const entryNode = childNodes[i];
          const entryObject = {};

          // Skip empty text nodes.
          if (entryNode.nodeName === '#text')
            continue;

          const items = entryNode.childNodes;

          for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (item.nodeName === '#text')
              continue;

            let value = item.innerHTML;

            if (item.nodeName === 'id' || item.nodeName === 'episodes') {
              value = parseInt(value, 10);
            }

            entryObject[item.nodeName] = value;
          }

          if (node.nodeName === 'myanimelist') {
            if (entryNode.nodeName === 'anime' || entryNode.nodeName === 'manga') {
              if (!object[node.nodeName][entryNode.nodeName]) {
                object[node.nodeName][entryNode.nodeName] = [];
              }
              object[node.nodeName][entryNode.nodeName].push(entryObject);
            } else {
              object[node.nodeName][entryNode.nodeName] = entryObject;
            }
          } else {
            object[node.nodeName].push(entryObject);
          }
        }
      }

      return object;
    }

    _toXml(object) {
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
    }

    _get(url) {
      return new Promise((resolve, reject) => {
        if (isNode) {
          this._getForNode(url, resolve, reject);
        } else {
          this._getForBrowser(url, resolve, reject);
        }
      });
    }

    _getForNode(url, resolve, reject) {
      request.get(url, (error, response, data) => {
        if (!error && response.statusCode == 200) {
          this._xmlToJson(data)
            .then(resolve)
            .catch(reject);
        } else {
          reject('request failed');
        }
      }).auth(this._user, this._password);
    }

    _getForBrowser(url, resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', url, true, this._user, this._password);
      req.onload = () => {
        if (req.status === 200) {
          const data = req.response;

          // Covert the xml string to json
          this._xmlToJson(data)
            .then(resolve)
            .catch(reject);

        } else {
          reject('request failed');
        }
      };

      req.onerror = () => {
        reject('request failed');
      };

      req.send();
    }

    _post(url, data=null) {
      return new Promise((resolve, reject) => {
        if (isNode) {
          this._postForNode(url, data, resolve, reject);
        } else {
          this._postForBrowser(url, data, resolve, reject);
        }
      });
    }

    _postForNode(url, data, resolve, reject) {
      if (data) {
        data = this._toXml(data);
        data = {form:{data: data}};
      }

      request.post(url, data, (error, response, data) => {
        if (!error && (response.statusCode == 200 || response.statusCode === 201)) {
          resolve(data);
        } else {
          reject('request failed');
        }
      }).auth(this._user, this._password);
    }

    _postForBrowser(url, data, resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('POST', url, true, this._user, this._password);
      req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      req.onload = function() {
        if (req.status === 200 || req.status === 201) {
          resolve(req.response);
        } else {
          reject(req.response);
        }
      };

      req.onerror = function() {
        reject('request failed');
      };

      if (data) {
        var xml = this._toXml(data);
        req.send('data='+xml);
      } else {
        req.send();
      }
    }
  }

  if (isNode) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = MALjs;
    }
    exports.MALjs = MALjs;
  } else {
    window.MALjs = MALjs;
  }
})();
