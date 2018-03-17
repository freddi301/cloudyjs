/* @flow */

export type Value =
  | boolean
  | number
  | string
  | $ReadOnlyArray<Array<Value>>
  | $ReadOnly<{ [key: string]: Value }>;

export type Cloudy = { [key: string]: (Value) => Promise<Value> };

export type Cloudify<T: Cloudy> = T => T;
