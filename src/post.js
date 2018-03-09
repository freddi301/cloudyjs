// @flow

import type { Value, cloudy } from './';

import { fetch } from "node-fetch";

export const postRepos: Map<string, Map<string, Function>> = new Map();
export const post = <T, R>(url: string): cloudy<T, R> => {
  let newMap;
  const repo =
    postRepos.get(url) || (postRepos.set(url, (newMap = new Map())), newMap);
  return fun => {
    const footprint = new Error().stack;
    repo.set(footprint, fun);
    return async arg => {
      const response = await fetch(url, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          function: footprint,
          argument: arg instanceof Promise ? await arg : arg
        })
      });
      return response.json();
    };
  };
};