// @flow

import type { Cloudy, Cloudable, Clouded } from "./index";

export function dict<
  Conf,
  T,
  R,
  Functions: { [key: string]: Cloudable<any, any> }
>(
  fun: Cloudy<Conf, T, R>,
  conf: (functionName: string) => Conf,
  functions: Functions
): $ObjMap<Functions, <T, R>(fun: Cloudable<T, R>) => Clouded<T, R>> {
  const wrapped: $ObjMap<
    Functions,
    <T, R>(fun: Cloudable<T, R>) => Clouded<T, R>
  > = {};
  for (const [key, value] of Object.entries(functions)) {
    wrapped[key] = fun(conf(key), (value: any));
  }
  return wrapped;
}
