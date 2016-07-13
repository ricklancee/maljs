"use strict";

import { parseString } from 'xml2js';

class MALjs {
  constructor(user, password) {
    this.user = user;
    this.password = password;
    this.baseUrl = 'http://myanimelist.net/api';
    this.authHeader = btoa(this.username + ":" + this.password);
  }

  search(query) {
    return new Promise((resolve, reject) => {

      this._request('/anime|manga/search.xml?q='+query)
        .then(xmlData => {
          parseString(xmlData, function (err, result) {
            if (result) resolve(result);
            if (err) reject(err);
          });
        })
        .catch(reject);
    });
  }

  _request(url) {
    return new Promise((resolve, reject) => {
      var req = new XMLHttpRequest();
      req.open('GET', this.baseUrl+url, true);
      req.setRequestHeader("Authorization", "Basic " + authHeader);

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

