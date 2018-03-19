// @flow

import noop from "../src/noop";
import TestApp from "../src/testApp.js";

test("noop dict", async () => {
  const cloud = noop()(new TestApp)
  expect(await cloud.complexJob(["a", "b"])).toEqual(["A", "B"]);
});
