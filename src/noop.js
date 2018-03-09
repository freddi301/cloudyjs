// @flow

import type { Value, cloudy } from './';

export const noop = <T: Value, R: Value>(): cloudy<T, R> => fun => async arg =>
  fun(arg instanceof Promise ? await arg : arg);