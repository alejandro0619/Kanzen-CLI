export default function sanitizeArray(arr): [] {
  return arr.reduce((acc, el) => acc.includes(el) ? acc : [...acc, el], []);
}