/* eslint-disable import/prefer-default-export */

function parseObject(thing: object) {
  let qs = '';

  const entries = Object.entries(thing);
  if (entries.length === 0) {
    return qs;
  }

  entries.forEach(([key, value]) => {
    if (!value) {
      return;
    }

    qs += (qs === '') ? '?' : '&';
    qs += `${key}=${encodeURIComponent(value)}`;
  });

  return qs;
}

export function stringify(thing: object | string) {
  if (!thing) {
    return '';
  }

  if (typeof thing === 'string') {
    return thing;
  }

  return parseObject(thing);
}
