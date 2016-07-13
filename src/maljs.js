"use strict";

// import xml2js from 'xml2js';

class MALjs {
  constructor(user, password) {
    this.user = user;
    this.password = password;
    this.baseUrl = 'http://myanimelist.net/api';
  }

  search(query) {
    this._request('/anime/search.xml?q='+query);
  }

  _request(url) {
    var req = new XMLHttpRequest();
    req.open('GET', this.baseUrl+url, true);
    // req.withCredentials = true;
    req.setRequestHeader("Authorization", "Basic " + btoa(this.username + ":" + this.password));

    req.onload = function() {
      if (req.status === 200) {
        console.log('success!');
      } else {
        console.log('failed');
      }
    };
    req.onerror = function() {
      console.log('failed');
    };
    req.send();
  }
}

window.MALjs = MALjs;

