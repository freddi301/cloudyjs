// @flow

import TestApp from "./testApp";
import { client } from "./rest";

const app = new TestApp();

export const work = async (event: any, context: any, callback: any) => {
  try {
    const body = JSON.parse(event.body);
    const clientInstance = client({
      app,
      url: `http://${event.headers.Host}${event.path}`
    });
    const result = await (app: any)[body.function].call(
      clientInstance,
      body.argument
    );
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result)
    });
  } catch (error) {
    callback(error);
  }
};
