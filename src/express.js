// @flow

import type { Cloudy, Cloudify } from "./";
import express from "express";
import bodyParser from "body-parser";

import { client } from './rest';

async function server<T: Cloudy>({ app, port }: { app: T, port: number }): Server {
  const exp = express();
  exp.use(bodyParser());
  exp.post("/", async (req: express$Request, res) => {
    const call: { function: $Keys<T>, argument: $Values<T> } = (req.body: any);
    res.json(await app[call.function](call.argument));
  });
  const ready = new Promise((resolve, reject) =>
    exp.listen(port, error => (error ? reject(error) : resolve()))
  );
  return ready;
}

export default function nodeExpress<T: Cloudy>({
  host,
  port,
  ready
}: {
  host: string,
  port: number
}): Cloudify<T> {
  return app => {
    return client({ app, wait: server({ app, port }), url: `${host}:${port}` });
  }
}
