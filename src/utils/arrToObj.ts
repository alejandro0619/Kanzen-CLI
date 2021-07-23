export const arrayToObject = (arr: [], key: string) => {
  return arr.reduce((obj, item) => {
      obj[item[key]] = item
      return obj
  }, {})
}