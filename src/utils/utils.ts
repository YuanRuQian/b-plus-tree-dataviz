export const isNull = (node: any): node is null => {
  return node === null;
};

export const isUndefined = (value: any): value is undefined => {
  return typeof value === "undefined";
};
