// @flow

export const complexJob = (items: string[]) => Promise.all(items.map(simpleJob));

export const simpleJob = (item: string) => item.toLocaleLowerCase();