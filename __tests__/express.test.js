// @flow

import express from "../src/express";
import { client } from "../src/rest";
import TestApp from "../src/testApp.js";

const port = 8089;

test("express", async () => {
  const app = new TestApp();
  const cloud = express({
    host: "http://localhost",
    port: port
  })(app);
  expect(await cloud.complexJob(["a", "b"])).toEqual(["A", "B"]);
  expect(
    await client({ app, url: `http://localhost:${port}` }).complexJob(["a", "b"])
  ).toEqual(["A", "B"]);
});

afterAll(() => {
  // should kill express app
});