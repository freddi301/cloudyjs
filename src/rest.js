// @flow

import type { Cloudy, Cloudify } from "./";
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
