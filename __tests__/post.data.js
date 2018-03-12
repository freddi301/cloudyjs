// @flow

import { post } from "../src/post";
import { dict } from "../src/dict";

export const clouds = dict(
  post(),
  functionName => ({ url: "http://localhost:3000/work", functionName }),
  {
    simpleJob: (item: string) => item.toUpperCase(),
    complexJob: (items: string[]) => Promise.all(items.map(clouds.simpleJob))
  }
);