"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MALjs = function () {
  function MALjs(user, password) {
    _classCallCheck(this, MALjs);

    this.user = user;
    this.password = password;

    if (!this.user || !this.password) {
      throw new Error('MALjs requires a myanimelist.net username and password.');
    }
  }

  _createClass(MALjs, [{
    key: 'search',
    value: function search(query) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this._get('http://myanimelist.net/api/anime/search.xml?q=' + query).then(_this._parseXml).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'list',
    value: function list() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2._get('http://myanimelist.net/malappinfo.php?u=' + _this2.user + '&status=all&type=anime').then(_this2._parseXml).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'add',
    value: function add(id, data) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {

        if (!data.entry) {
          data = { entry: data };
        }

        _this3._post('http://myanimelist.net/api/animelist/add/' + id + '.xml', data).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'update',
    value: function update(id, data) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {

        if (!data.entry) {
          data = { entry: data };
        }

        _this4._post('http://myanimelist.net/api/animelist/update/' + id + '.xml', data).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'delete',
    value: function _delete(id) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5._post('http://myanimelist.net/api/animelist/delete/' + id + '.xml').then(resolve).catch(reject);
      });
    }
  }, {
    key: 'verifyCredentials',
    value: function verifyCredentials() {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        _this6._get('http://myanimelist.net/api/account/verify_credentials.xml').then(_this6._parseXml).then(resolve).catch(reject);
      });
    }
  }, {
    key: '_parseXml',
    value: function _parseXml(xmlString) {
      return new Promise(function (resolve, reject) {
        parseString(xmlString, { explicitArray: false }, function (err, result) {
          if (result) resolve(result);
          if (err) reject(err);
        });
      });
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
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url, true, _this7.user, _this7.password);

        req.onload = function () {
          if (req.status === 200) {
            resolve(req.response);
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
      var _this8 = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      return new Promise(function (resolve, reject) {

        var req = new XMLHttpRequest();
        req.open('POST', url, true, _this8.user, _this8.password);
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        req.onload = function () {
          if (req.status === 200 || req.status === 201) {
            resolve(req.response);
          } else {
            reject('request failed');
          }
        };

        req.onerror = function () {
          reject('request failed');
        };

        if (data) {
          var xml = _this8._toXml(data);
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