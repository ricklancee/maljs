(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

// import xml2js from 'xml2js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MALjs = function () {
  function MALjs(user, password) {
    _classCallCheck(this, MALjs);

    this.user = user;
    this.password = password;
    this.baseUrl = 'http://myanimelist.net/api';
  }

  _createClass(MALjs, [{
    key: 'search',
    value: function search(query) {
      this._request('/anime/search.xml?q=' + query);
    }
  }, {
    key: '_request',
    value: function _request(url) {
      var req = new XMLHttpRequest();
      req.open('GET', this.baseUrl + url, true);
      // req.withCredentials = true;
      req.setRequestHeader("Authorization", "Basic " + btoa(this.username + ":" + this.password));

      req.onload = function () {
        if (req.status === 200) {
          console.log('success!');
        } else {
          console.log('failed');
        }
      };
      req.onerror = function () {
        console.log('failed');
      };
      req.send();
    }
  }]);

  return MALjs;
}();

window.MALjs = MALjs;

},{}]},{},[1]);
