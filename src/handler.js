// @flow

require("babel-register");

const clouds = require("../__tests__/post.data").clouds;

module.exports.work = (event: any, context: any, callback: any) => {
  const req = JSON.parse(event.body);
  const fun = clouds[req.function]["original"];
  const result = Promise.resolve(fun(req.argument));
  result.then(result =>
      {
        console.log(result)
        callback(null, {
          statusCode: 200,
          body: result
        })
      }
    )
    .catch(error => callback(error));
};
