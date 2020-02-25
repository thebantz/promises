/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */

var Promise = require('bluebird');
var fs = require('fs');
var callbackReview = require('../bare_minimum/callbackReview.js');
var pluck = callbackReview.pluckFirstLineFromFile;

var writeFileAsync = Promise.promisify(fs.writeFile);


var combineFirstLineOfManyFiles = function (filePaths, writePath) {
  return new Promise ((resolve, reject) => {
    var promises = [];

    filePaths.forEach(file => {
      promises.push(new Promise((resolve, reject) => {
        pluck(file, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      }));
    });

    Promise.all(promises).then((values) => {
      values = values.join('\n');
      new Promise ((resolve, reject => {
        fs.writeFile(writePath, values, (err, data) => {
          return err ? reject(err) : resolve(data);
        });
      }));
    });
  });
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};