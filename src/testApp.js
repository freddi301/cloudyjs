// @flow

import type { Value } from '../src'

export default class TestApp {
  async simpleJob(item: string): Promise<string> {
    return item.toUpperCase();
  }
  async complexJob(items: string[]): Promise<string[]> {
    return Promise.all(items.map(this.simpleJob));
  }
}
