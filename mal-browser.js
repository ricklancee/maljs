"use strict";

import wrapper from './wrapper';
import parser from './request/browser';
import request from './request/browser';

const MALjs = function(username, password) {
  if (!username || !password) {
    throw new Error('MALjs requires a myanimelist.net username and password. Please provide these as the function\'s arguments.');
  }

  return wrapper(request, parser, username, password);
};

export default MALjs;