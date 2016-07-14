"use strict";

import { parseString, Builder } from 'xml2js';

class MALjs {
  constructor(user, password) {
    this.user = user;
    this.password = password;
    this.baseUrl = 'http://myanimelist.net/api';
  }

  search(query) {
    return new Promise((resolve, reject) => {
      this._get('http://myanimelist.net/api/anime/search.xml?q='+query)
        .then(this._parseXml)
        .then(resolve)
        .catch(reject);
    });
  }

  verifyCredentials() {
    return new Promise((resolve, reject) => {

      this._get('http://myanimelist.net/api/account/verify_credentials.xml')
        .then(this._parseXml)
        .then(resolve)
        .catch(reject);
    });
  }

  list() {
    return new Promise((resolve, reject) => {
      this._get('http://myanimelist.net/malappinfo.php?u='+this.user+'&status=all&type=anime')
        .then(this._parseXml)
        .then(resolve)
        .catch(reject);
    });
  }

  _parseXml(xmlString) {
    return new Promise((resolve, reject) => {
      parseString(xmlString, { explicitArray: false }, (err, result) => {
        if (result) resolve(result);
        if (err) reject(err);
      });
    });
  }

  _get(url) {
    return new Promise((resolve, reject) => {
      var req = new XMLHttpRequest();
      req.open('GET', url, true, this.user, this.password);

      req.onload = function() {
        if (req.status === 200) {
          resolve(req.response);
        } else {
          reject('request failed');
        }
      };
      req.onerror = function() {
        reject('request failed');
      };
      req.send();
    });
  }
}

window.MALjs = MALjs;

