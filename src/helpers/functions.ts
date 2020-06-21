import { compare } from 'bcryptjs';

/**
 * Checks if string arrays are equal
 */
export function stringArraysEqual(array1: Array<string>, array2: Array<string>) {
  // check lengths are the same
  if (array1.length != array2.length) {
    return false;
  }
  // sort arrays (tc O(n^2) < 10 or (nlog(n) > 10))
  array1.sort();
  array2.sort();

  // check each element in array O(n)
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) return false;
  }

  return true;
}
