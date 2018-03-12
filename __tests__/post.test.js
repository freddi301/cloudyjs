// @flow

import { clouds } from "./post.data";

test("post dict", async () => {
  expect(await clouds.complexJob(["a", "b"])).toEqual(["A", "B"]);
  expect(await clouds.simpleJob("a")).toEqual("A");
});
