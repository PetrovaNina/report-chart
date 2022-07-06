export const getDataSum = (data, parameter) => {
  return data.reduce((acc, cur) => (acc += cur[parameter]), 0).toFixed(0);
};
