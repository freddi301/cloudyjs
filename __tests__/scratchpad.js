/* @flow */

export type Value = boolean | number | string | $ReadOnlyArray<Array<Value>> | $ReadOnly<{[key: string]: Value}>;

export type cloudable<T: Value, R: Value> = T => (R | Promise<R>);

export type clouded<T: Value, R: Value> = (T | Promise<T>) => (Promise<R>);

export type cloudy<T: Value, R: Value> = (fun: cloudable<T, R>) => clouded<T, R>;

function mockCloudy<T: Value, R: Value>(fun: cloudable<T, R>): clouded<T, R> {
    return async (arg) => await fun(await arg);
}

fetch('http://localhost:3000/eval', {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      function: 'Math.random',
      argument: null
  })
}).then(res=>res.json())