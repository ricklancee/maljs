"use strict";

import { parseString, Builder } from 'xml2js';

class MALjs {
  constructor(user, password) {
    this.user = user;
    this.password = password;

    if (!this.user || !this.password) {
      throw new Error('MALjs requires a myanimelist.net username and password.');
    }
  }

  search(query) {
    return new Promise((resolve, reject) => {
      this._get('http://myanimelist.net/api/anime/search.xml?q='+query)
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

  add(id, data) {
    return new Promise((resolve, reject) => {

      if (!data.entry) {
        data = {entry: data};
      }

      this._post('http://myanimelist.net/api/animelist/add/'+id+'.xml', data)
        .then(resolve)
        .catch(reject);
    });
  }

  update(id, data) {
    return new Promise((resolve, reject) => {

      if (!data.entry) {
        data = {entry: data};
      }

      this._post('http://myanimelist.net/api/animelist/update/'+id+'.xml', data)
        .then(resolve)
        .catch(reject);
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this._post('http://myanimelist.net/api/animelist/delete/'+id+'.xml')
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

  _post(url, data=null) {
    return new Promise((resolve, reject) => {

      if (data) {
        var builder = new Builder();
        var xml = builder.buildObject(data);
      }

      var req = new XMLHttpRequest();
      req.open('POST', url, true, this.user, this.password);
      req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      req.onload = function() {
        if (req.status === 200 || req.status === 201) {
          resolve(req.response);
        } else {
          reject('request failed');
        }
      };

      req.onerror = function() {
        reject('request failed');
      };

      if (xml) {
        req.send('data='+xml);
      } else {
        req.send();
      }

    });
  }
}

window.MALjs = MALjs;

