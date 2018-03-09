// @flow

import { noop, post } from "../src/index";

const cloudyTest = async cloudy => {
  const simpleJob = cloudy((item: string) => item.toUpperCase());
  const complexJob = cloudy((items: string[]) =>
    Promise.all(items.map(simpleJob))
  );
  expect(await complexJob(["a", "b"])).toEqual(["A", "B"]);
};

test("noop", async () => {
  await cloudyTest(noop);
});

// test("post", async () => {
//   await cloudyTest(post("http://localhost:3000/cloudy"));
// });
