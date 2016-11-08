"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MALjs = function () {
  function MALjs(user, password) {
    var _this = this;

    _classCallCheck(this, MALjs);

    if (!user || !password) {
      throw new Error('MALjs requires a myanimelist.net username and password.');
    }

    this._user = user;
    this._password = password;

    this._parser = new DOMParser();

    this.anime = {
      search: function search(query) {
        return _this.search(query, 'anime');
      },
      list: function list() {
        return _this.list('anime');
      },
      add: function add(id, data) {
        return _this.add(id, data, 'anime');
      },
      update: function update(id, data) {
        return _this.update(id, data, 'anime');
      },
      delete: function _delete(id, data) {
        return _this.delete(id, 'anime');
      }
    };

    this.manga = {
      search: function search(query) {
        return _this.search(query, 'manga');
      },
      list: function list() {
        return _this.list('manga');
      },
      add: function add(id, data) {
        return _this.add(id, data, 'manga');
      },
      update: function update(id, data) {
        return _this.update(id, data, 'manga');
      },
      delete: function _delete(id, data) {
        return _this.delete(id, 'manga');
      }
    };
  }

  _createClass(MALjs, [{
    key: 'search',
    value: function search(query, type) {
      this._checkType(type);

      return this._get('http://myanimelist.net/api/' + type + '/search.xml?q=' + query);
    }
  }, {
    key: 'list',
    value: function list(type) {
      this._checkType(type);
      return this._get('http://myanimelist.net/malappinfo.php?u=' + this._user + '&status=all&type=' + type);
    }
  }, {
    key: 'add',
    value: function add(id, data, type) {
      this._checkType(type);

      if (!data.entry) {
        data = { entry: data };
      }

      return this._post('http://myanimelist.net/api/' + type + 'list/add/' + id + '.xml', data);
    }
  }, {
    key: 'update',
    value: function update(id, data, type) {
      this._checkType(type);

      if (!data.entry) {
        data = { entry: data };
      }

      return this._post('http://myanimelist.net/api/' + type + 'list/update/' + id + '.xml', data);
    }
  }, {
    key: 'delete',
    value: function _delete(id, type) {
      this._checkType(type);
      return this._post('http://myanimelist.net/api/' + type + 'list/delete/' + id + '.xml');
    }
  }, {
    key: 'verifyCredentials',
    value: function verifyCredentials() {
      return this._get('http://myanimelist.net/api/account/verify_credentials.xml');
    }
  }, {
    key: '_checkType',
    value: function _checkType(type) {
      if (type !== 'anime' && type !== 'manga') {
        throw new Error('Only allowed types are anime and manga. incorrect type: ' + type + ' given.');
      }
    }
  }, {
    key: '_parseXml',
    value: function _parseXml(xmlString) {
      var dom = this._parser.parseFromString(xmlString, "text/xml");

      if (dom.documentElement.nodeName === "html") {
        return false;
      }

      return dom;
    }
  }, {
    key: '_toJson',
    value: function _toJson(dom) {
      var nodes = dom.childNodes;
      var object = {};

      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        object[node.nodeName] = [];
        var childNodes = node.childNodes;

        for (var _i = 0; _i < childNodes.length; _i++) {
          var entryNode = childNodes[_i];
          var entryObject = {};

          // Skip empty text nodes.
          if (entryNode.nodeName === '#text') continue;

          var items = entryNode.childNodes;

          for (var _i2 = 0; _i2 < items.length; _i2++) {
            var item = items[_i2];

            if (item.nodeName === '#text') continue;

            var value = item.innerHTML;

            if (item.nodeName === 'id' || item.nodeName === 'episodes') {
              value = parseInt(value, 10);
            }

            entryObject[item.nodeName] = value;
          }

          object[node.nodeName].push(entryObject);
        }
      }

      return object;
    }
  }, {
    key: '_toXml',
    value: function _toXml(object) {
      var xmlString = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';

      function getProps(obj) {
        for (var property in obj) {
          if (obj.hasOwnProperty(property)) {
            if (obj[property].constructor == Object) {
              xmlString += '<' + property + '>';
              getProps(obj[property]);
              xmlString += '</' + property + '>';
            } else {
              xmlString += '<' + property + '>' + obj[property] + '</' + property + '>';
            }
          }
        }
      }

      getProps(object);

      return xmlString;
    }
  }, {
    key: '_get',
    value: function _get(url) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();

        req.open('GET', url, true, _this2._user, _this2._password);

        req.onload = function () {
          if (req.status === 200) {
            var data = req.response;
            var xml = _this2._parseXml(data);

            if (xml) {
              resolve(_this2._toJson(xml));
            } else {
              reject('Failed to parse xml');
            }
          } else {
            reject('request failed');
          }
        };

        req.onerror = function () {
          reject('request failed');
        };

        req.send();
      });
    }
  }, {
    key: '_post',
    value: function _post(url) {
      var _this3 = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('POST', url, true, _this3._user, _this3._password);
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        req.onload = function () {
          if (req.status === 200 || req.status === 201) {
            resolve(req.response);
          } else {
            reject(req.response);
          }
        };

        req.onerror = function () {
          reject('request failed');
        };

        if (data) {
          var xml = _this3._toXml(data);
          req.send('data=' + xml);
        } else {
          req.send();
        }
      });
    }
  }]);

  return MALjs;
}();

window.MALjs = MALjs;