// @flow

import type { Cloudy, Cloudify } from './';

export default function noop<T: Cloudy>(): Cloudify<T> {
  return app => app;
}
