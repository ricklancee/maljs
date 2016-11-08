'use strict';

(function() {
  var root = this;
  var isNode = typeof exports !== 'undefined';

  if (isNode) {
    var chalk = require('chalk');
  }

  var it = function(description, test) {
    return new Promise((resolve, reject) => {
      var failed = false;
      var testFN = {
        done: function() {
          if (!failed) {
            if (!isNode) {
              document.querySelector('#success').innerHTML += 'Passed test: It '+ description + '<br>';
            } else {
              console.log(chalk.green('Passed test: It '+ description));
            }

            resolve();
          }
        },
        fail: function(msg) {
          if (!isNode) {
            document.querySelector('#error').innerHTML = 'Failed test: It '+ description + '.<br>('+msg+')<br>';
          } else {
            console.log(chalk.red('Failed test: It '+ description + '\n ('+msg+')'));
          }

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
        if (!isNode) {
          document.querySelector('#error').innerHTML = 'Failed test: It '+ description + '<br>';
          document.querySelector('#error').innerHTML += err.stack;
        } else {

          console.log(chalk.red('Failed test: It '+ description));
          console.log(chalk.red(err));
        }

        throw err;
      }
    });
  }


  if (isNode) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = it;
    }
    exports.it = it;
  } else {
    root.it = it;
  }

}).call(this);


