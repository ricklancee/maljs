"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var isNode = typeof exports !== 'undefined';
  var xml2js;
  var request;

  if (isNode) {
    xml2js = require('xml2js');
    request = require('request');
  }

  var MALjs = function () {
    function MALjs(user, password) {
      var _this = this;

      _classCallCheck(this, MALjs);

      if (!user || !password) {
        throw new Error('MALjs requires a myanimelist.net username and password.');
      }

      this._user = user;
      this._password = password;
      this._base = 'https://myanimelist.net';

      this._parser = isNode ? new xml2js.Parser() : new DOMParser();

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

        return this._get(this._base + '/api/' + type + '/search.xml?q=' + query);
      }
    }, {
      key: 'list',
      value: function list(type) {
        this._checkType(type);
        return this._get(this._base + '/malappinfo.php?u=' + this._user + '&status=all&type=' + type);
      }
    }, {
      key: 'add',
      value: function add(id, data, type) {
        this._checkType(type);

        if (!data) {
          return;
        }

        if (!data.entry) {
          data = { entry: data };
        }

        return this._post(this._base + '/api/' + type + 'list/add/' + id + '.xml', data);
      }
    }, {
      key: 'update',
      value: function update(id, data, type) {
        this._checkType(type);

        if (!data) {
          return;
        }

        if (!data.entry) {
          data = { entry: data };
        }

        return this._post(this._base + '/api/' + type + 'list/update/' + id + '.xml', data);
      }
    }, {
      key: 'delete',
      value: function _delete(id, type) {
        this._checkType(type);
        return this._post(this._base + '/api/' + type + 'list/delete/' + id + '.xml');
      }
    }, {
      key: 'verifyCredentials',
      value: function verifyCredentials() {
        return this._get(this._base + '/api/account/verify_credentials.xml');
      }
    }, {
      key: '_checkType',
      value: function _checkType(type) {
        if (type !== 'anime' && type !== 'manga') {
          throw new Error('Only allowed types are anime and manga. incorrect type: ' + type + ' given.');
        }
      }
    }, {
      key: '_xmlToJson',
      value: function _xmlToJson(xmlString) {
        var _this2 = this;

        return new Promise(function (resolve, reject) {
          if (isNode) {
            _this2._parser.parseString(xmlString, function (err, result) {

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
            var dom = _this2._parser.parseFromString(xmlString, "text/xml");

            if (dom.documentElement.nodeName === "html") {
              reject('Failed to parse xml.');
            } else {
              resolve(_this2._domToJson(dom));
            }
          }
        });
      }
    }, {
      key: '_domToJson',
      value: function _domToJson(dom) {
        var nodes = dom.childNodes;
        var object = {};

        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];

          if (node.nodeName === 'myanimelist') {
            object[node.nodeName] = {};
          } else {
            object[node.nodeName] = [];
          }

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
        var _this3 = this;

        return new Promise(function (resolve, reject) {
          if (isNode) {
            _this3._getForNode(url, resolve, reject);
          } else {
            _this3._getForBrowser(url, resolve, reject);
          }
        });
      }
    }, {
      key: '_getForNode',
      value: function _getForNode(url, resolve, reject) {
        var _this4 = this;

        request.get(url, function (error, response, data) {
          if (!error && response.statusCode == 200) {
            _this4._xmlToJson(data).then(resolve).catch(reject);
          } else {
            reject('request failed');
          }
        }).auth(this._user, this._password);
      }
    }, {
      key: '_getForBrowser',
      value: function _getForBrowser(url, resolve, reject) {
        var _this5 = this;

        var req = new XMLHttpRequest();
        req.open('GET', url, true, this._user, this._password);
        req.onload = function () {
          if (req.status === 200) {
            var data = req.response;

            // Covert the xml string to json
            _this5._xmlToJson(data).then(resolve).catch(reject);
          } else {
            reject('request failed');
          }
        };

        req.onerror = function () {
          reject('request failed');
        };

        req.send();
      }
    }, {
      key: '_post',
      value: function _post(url) {
        var _this6 = this;

        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        return new Promise(function (resolve, reject) {
          if (isNode) {
            _this6._postForNode(url, data, resolve, reject);
          } else {
            _this6._postForBrowser(url, data, resolve, reject);
          }
        });
      }
    }, {
      key: '_postForNode',
      value: function _postForNode(url, data, resolve, reject) {
        if (data) {
          data = this._toXml(data);
          data = { form: { data: data } };
        }

        request.post(url, data, function (error, response, data) {
          if (!error && (response.statusCode == 200 || response.statusCode === 201)) {
            resolve(data);
          } else {
            reject('request failed');
          }
        }).auth(this._user, this._password);
      }
    }, {
      key: '_postForBrowser',
      value: function _postForBrowser(url, data, resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('POST', url, true, this._user, this._password);
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
          var xml = this._toXml(data);
          req.send('data=' + xml);
        } else {
          req.send();
        }
      }
    }]);

    return MALjs;
  }();

  if (isNode) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = MALjs;
    }
    exports.MALjs = MALjs;
  } else {
    window.MALjs = MALjs;
  }
})();