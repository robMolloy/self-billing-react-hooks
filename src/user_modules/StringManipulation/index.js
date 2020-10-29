export const ucFirst = (str) => {
  return ucToNth(str, 0);
};

export const ucToNth = (str, n) => {
  if (typeof str !== "string") return str;

  const strStart = str.substr(0, n + 1);
  const strEnd = str.substr(n + 1);

  return strStart.toUpperCase() + strEnd;
};
