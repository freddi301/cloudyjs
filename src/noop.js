// @flow

import type { Value, Cloudy } from './';

export const noop = <T: Value, R: Value>(): Cloudy<void, T, R> => (conf, fun) => async arg =>
  fun(arg instanceof Promise ? await arg : arg);