/* global localStorage */

export default async items => Promise.all(items
  .map(async ({ key, value }) => localStorage.setItem(key, value)));
