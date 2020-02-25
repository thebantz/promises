/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

var CustomError = function(code, message) {
  this.code = code;
  this.message = message;
};

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  // TODO
  fs.readFile(filePath, (err, data) => {
    if (err) {
      callback(new CustomError('ENOENT', 'Could not read file'));
    } else {
      data = data.toString().split('\n');
      data.length = 1;
      callback(null, data.toString());
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request.get(url, (err, response) => {
    if (err) {
      callback(new Error('Invalid URI'));
    } else {
      callback(null, response.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
