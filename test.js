'use strict';

function it(description, test) {
  try {
    if (test() === false) {
      throw new Error('Failed test: It '+ description);
    }

    document.querySelector('#success').innerHTML += 'Passed test: It '+ description + '<br>';
  } catch (err) {
    document.querySelector('#error').innerHTML = err.stack;
    throw err;
  }
}
