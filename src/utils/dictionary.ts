/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

import { sg } from '@utilsFn/safe-get';

interface Dictionary<T> {
  [name: string]: T;
}
// eslint-disable-next-line no-redeclare
interface Dictionary<T> {
  [name: number]: T;
}
// eslint-disable-next-line prettier/prettier
export type { Dictionary };

type IMap<T, K> = (value: T, index: number, array: T[]) => K;
function toDictionary<T, K = T>(
  array: T[],
  key: ((value: T) => number | string) | keyof T,
  mapInner?: IMap<T, K>
): Dictionary<K> {
  if (sg(() => array.length, 0) === 0) {
    return {};
  }
  return array.reduce((p: any, c: T, i, a) => {
    const k = typeof key === 'function' ? key(c) : c[key];
    const v = mapInner ? mapInner(c, i, a) : c;
    return { ...p, [k as any]: v };
  }, {});
}
function toArray<T>(dictionaryInner: Dictionary<T>): T[] {
  if (!dictionaryInner) {
    return [];
  }
  const keysInner = Object.keys(dictionaryInner);
  if (keysInner.length === 0) {
    return [];
  }

  return keysInner.map((v) => dictionaryInner[v]);
}

export { toArray, toDictionary };

// Dictionary Object
export type DictionaryObject<T> = Dictionary<T> & {
  map<K = T>(callback: Callback<T, K>): DictionaryObject<K>;
  filter(callback: Callback<T, boolean>): DictionaryObject<T>;
  forEach(callback: Callback<T, void>): void;
  toArray(): T[];
  reduce<TT, K>(
    callback: (
      previous: DictionaryObject<K>,
      ...callback: Parameters<Callback<TT, any>>
    ) => DictionaryObject<K>
  ): DictionaryObject<K>;
  keys(): string[];
  [Symbol.iterator](): Iterator<T>;
};

type Callback<T, Return> = (
  value: T,
  key: string,
  dictionary: DictionaryObject<T>
) => Return;

const reservedKeywords = new Set([
  'map',
  'filter',
  'forEach',
  'toArray',
  'reduce',
  'keys'
]);

export function dictionary<T>(dict: Dictionary<T> = {}): DictionaryObject<T> {
  return Object.assign(dict, {
    map,
    forEach,
    filter,
    toArray: _toArray,
    reduce,
    keys,
    [Symbol.iterator]: iterator
  });
}

function map<T, K = T>(
  this: DictionaryObject<T>,
  callback: Callback<T, K>
): DictionaryObject<K> {
  return Object.keys(this).reduce((dict, key) => {
    if (reservedKeywords.has(key)) {
      return dict;
    }
    dict[key] = callback(this[key], key, this);
    return dict;
  }, dictionary<K>());
}
function filter<T>(
  this: DictionaryObject<T>,
  callback: Callback<T, boolean>
): DictionaryObject<T> {
  return Object.keys(this).reduce((dict, key) => {
    if (reservedKeywords.has(key) || !callback(this[key], key, this)) {
      return dict;
    }
    dict[key] = this[key];
    return dict;
  }, dictionary<T>());
}
function forEach<T>(
  this: DictionaryObject<T>,
  callback: Callback<T, void>
): void {
  Object.keys(this).forEach((key) => {
    if (!reservedKeywords.has(key)) {
      callback(this[key], key, this);
    }
  });
}
function _toArray<T>(this: DictionaryObject<T>): T[] {
  return Object.keys(this)
    .filter((key) => !reservedKeywords.has(key))
    .map((key) => this[key]);
}
function iterator<T>(this: Dictionary<T>): Iterator<T> {
  const keysInner = Object.keys(this);
  return {
    next: () => {
      const key = keysInner[0];
      keysInner.shift();
      if (keysInner.length === 0) {
        return { done: true, value: this[keysInner[0]] };
      }
      return { done: false, value: this[key] };
    }
  };
}
function reduce<T, K>(
  this: DictionaryObject<T>,
  callback: (
    previous: DictionaryObject<K>,
    ...callback: Parameters<Callback<T, any>>
  ) => DictionaryObject<K>
): DictionaryObject<K> {
  return Object.keys(this)
    .filter((key) => !reservedKeywords.has(key))
    .reduce(
      (previous, next) => callback(previous, this[next], next, this),
      dictionary<K>()
    );
}
function keys<T>(this: DictionaryObject<T>): string[] {
  return Object.keys(this).filter((key) => !reservedKeywords.has(key));
}
