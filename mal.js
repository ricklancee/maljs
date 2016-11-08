"use strict";

class MALjs {

  constructor(user, password) {
    if (!user || !password) {
      throw new Error('MALjs requires a myanimelist.net username and password.');
    }

    this._user = user;
    this._password = password;
    this._base = 'https://myanimelist.net';
    this._parser = new DOMParser();

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

    if (!data.entry) {
      data = {entry: data};
    }

    return this._post(`${this._base}/api/${type}list/add/${id}.xml`, data);
  }

  update(id, data, type) {
    this._checkType(type);

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
    return this._get('${this._base}/api/account/verify_credentials.xml');
  }

  _checkType(type) {
    if (type !== 'anime' && type !== 'manga') {
      throw new Error('Only allowed types are anime and manga. incorrect type: '+type +' given.')
    }
  }

  _parseXml(xmlString) {
    const dom = this._parser.parseFromString(xmlString, "text/xml");

    if (dom.documentElement.nodeName === "html") {
      return false;
    }

    return dom;
  }

  _toJson(dom) {
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
      var req = new XMLHttpRequest();

      req.open('GET', url, true, this._user, this._password);

      req.onload = () => {
        if (req.status === 200) {
          const data = req.response;
          const xml = this._parseXml(data);

          if (xml) {
            resolve(this._toJson(xml));
          } else {
            reject('Failed to parse xml');
          }
        } else {
          reject('request failed');
        }
      };

      req.onerror = () => {
        reject('request failed');
      };

      req.send();
    });
  }

  _post(url, data=null) {
    return new Promise((resolve, reject) => {
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
    });
  }
}

window.MALjs = MALjs;

