'use strict';

(function () {
  var polyfillsNeeded = [];
  var polyFillsLoadedEvent = new CustomEvent('polyfillsLoaded', {
    bubbles: true
  });

  var loadScripts = function loadScripts(urls, succesCB, failCB) {
    var count = urls.length;
    var errored = false;

    if (urls.length == 0) return succesCB();

    urls.forEach(function (url) {
      var script = document.createElement('script');
      script.onload = function () {
        if (errored) return;
        if (! --count) succesCB();
      };
      script.onerror = function () {
        if (errored) return;
        failCB();
        errored = true;
      };
      script.src = url;
      document.head.insertBefore(script, document.head.firstChild);
    });
  };

  if (!('Promise' in window)) {
    polyfillsNeeded.push('./polyfills/promise.js');
  }

  // Load the polyfills
  loadScripts(polyfillsNeeded, function () {
    requestAnimationFrame(function () {
      document.dispatchEvent(polyFillsLoadedEvent);
    });
  }, function () {
    throw new Error('Failed to load promise polyfill');
  });
})();
