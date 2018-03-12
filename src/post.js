// @flow

import type { Value, Cloudy, Cloudable, Clouded } from "./";
import axios from "axios"

type Conf = { url: string, functionName: string };

export const post = <T, R>(): Cloudy<Conf, T, R> => (
  { url, functionName },
  fun
) => {
  const decorated = async arg => {
    const response = await axios.post(url, {
      function: functionName,
      argument: arg instanceof Promise ? await arg : arg
    }, {headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }});
    return response.data;
  }
  decorated.original = fun;
  return decorated;
};
