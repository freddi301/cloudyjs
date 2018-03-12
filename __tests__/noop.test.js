// @flow

import { noop } from "../src/noop";
import { dict } from "../src/dict";

test("noop", async () => {
  const simpleJob = noop()(void 0, (item: string) => item.toUpperCase());
  const complexJob = noop()(void 0, (items: string[]) =>
    Promise.all(items.map(simpleJob))
  );
  expect(await complexJob(["a", "b"])).toEqual(["A", "B"]);
});

test("noop dict", async () => {
  const clouds = dict(noop(), () => void 0, {
    simpleJob: (item: string) => item.toUpperCase(),
    complexJob: (items: string[]) => Promise.all(items.map(clouds.simpleJob))
  });
  expect(await clouds.complexJob(["a", "b"])).toEqual(["A", "B"]);
});
