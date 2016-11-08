'use strict';



var it = function(description, test) {
  return new Promise((resolve, reject) => {
    var failed = false;
    var testFN = {
      done: function() {
        if (!failed) {
          document.querySelector('#success').innerHTML += 'Passed test: It '+ description + '<br>';
        resolve();
        }
      },
      fail: function(msg) {
        document.querySelector('#error').innerHTML = 'Failed test: It '+ description + '.<br>('+msg+')<br>';
        failed = true;
        reject();
      }
    };

    try {
      if (test.call(testFN) === false) {
        throw new Error('Failed test: It '+ description);
        reject();
      }

    } catch (err) {
      reject();
      document.querySelector('#error').innerHTML = 'Failed test: It '+ description + '<br>';
      document.querySelector('#error').innerHTML += err.stack;
      throw err;
    }
  });

}


