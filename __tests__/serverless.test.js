// @flow

import { client } from "../src/rest";
import TestApp from "../src/testApp.js";
import { spawn } from "child_process";

test(
  "express",
  async () => {
    // launch serverless
    const app = new TestApp();
    expect(
      await client({ app, url: "http://localhost:3000/work" }).complexJob([
        "a",
        "b"
      ])
    ).toEqual(["A", "B"]);
  },
  20000
);
