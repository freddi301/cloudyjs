// @flow

import type { Cloudy, Cloudify } from "./";
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import adapter from 'axios/lib/adapters/http';

export function client<T: Cloudy>({
  app,
  wait,
  url
}: {
  app: T,
  wait?: Promise<void>,
  url: string
}): T {
  const decorated: T = ({}: any);
  for (const name of Object.getOwnPropertyNames(Object.getPrototypeOf(app))) {
    if (name === "constructor") continue;
    decorated[name] = async function(arg) {
      await wait;
      const response = await axios.post(
        url,
        {
          function: name,
          argument: arg
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          adapter
        }
      );
      return response.data;
    };
  }
  return decorated;
}

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
