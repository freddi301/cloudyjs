/* @flow */

export type Value =
  | any
  | boolean
  | number
  | string
  | $ReadOnlyArray<Array<Value>>
  | $ReadOnly<{ [key: string]: Value }>;

export type cloudable<T: Value, R: Value> = T => R | Promise<R>;

export type clouded<T: Value, R: Value> = T => Promise<R>;

export type cloudy<T: Value, R: Value> = (
  fun: cloudable<T, R>
) => clouded<T, R>;
