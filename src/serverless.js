// @flow

require("babel-register");

const app = new (require("../src/testApp").default);
const client = require("../src/rest").client;

module.exports.work = (event: any, context: any, callback: any) => {
  const req = JSON.parse(event.body);
  const result = Promise.resolve(
    (app: any)[req.function].call(client({ app: app, url: `http://${event.headers.Host}${event.path}` }), req.argument)
  );
  result
    .then(result => {
      callback(null, {
        statusCode: 200,
        body: result
      });
    })
    .catch(error => callback(error));
};
