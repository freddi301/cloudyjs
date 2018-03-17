// @flow

import express, { client } from "../src/express";
import TestApp from "./testApp.js";

test("express", async () => {
  const app = new TestApp();
  const cloud = express({
    host: "http://localhost",
    port: 8080
  })(app);
  expect(await cloud.complexJob(["a", "b"])).toEqual(["A", "B"]);
  expect(
    await client({ app, url: "http://localhost:8080" }).complexJob(["a", "b"])
  ).toEqual(["A", "B"]);
});

afterAll(() => {
  // should kill express app
});