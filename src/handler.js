'use strict';

module.exports.eval = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(eval(event.body)),
  });

};
