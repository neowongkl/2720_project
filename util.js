// This file contain some utility functions used in index.js

// This function checks if the given userid and passwd match the 
// predefined user ID and password (to emulate authentication).
function authenticate(userid, passwd) {
  return (userid === 'john' && passwd === '123') ||
         (userid === 'jane' && passwd === '456');
}

// This function generates the content of the main page 
// and return the generated HTML code as a string.
//
// If the current user has logged in, the call should pass
// the ID of the user to this function.
// Otheriwse the caller should pass "undefined" to this 
// function.
function generateMainPage(userid) {
  var buf = '';
  if (typeof userid === 'string') {
    buf += '<h1>You are currently logged in as ' +
           userid + '</h1>';
    buf += '<a href="/logout">Logout</a>';
  }
  else {
    buf += '<h1>You have not yet logged in</h1>';
    buf += '<a href="/login.html">Login</a>';
  }

  buf += '<hr>';
  buf += '<p><a href="/private/hello.txt">hello.txt</a></p>';

  buf += '<p>Note: hello.txt is only accessible to a user who ' +
         'has successfully logged in. ' +
         'If a user has not yet logged in, the app will' +
         ' forward the user to the login page.';

  return buf;
}

// Export two functions from this module 
module.exports = {
  authenticate: authenticate,
  generateMainPage: generateMainPage
};
