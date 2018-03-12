/* @flow */

export type Value =
  | any
  | boolean
  | number
  | string
  | $ReadOnlyArray<Array<Value>>
  | $ReadOnly<{ [key: string]: Value }>;

export type Cloudable<T: Value, R: Value> = T => R | Promise<R>;

export type Clouded<T: Value, R: Value> = T => Promise<R>;

export type Cloudy<Conf, T: Value, R: Value> = (
  conf: Conf,
  fun: Cloudable<T, R>
) => Clouded<T, R>;
